import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");

function loadEnvFile() {
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function getArg(name, fallback) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : fallback;
}

function hashNumber(value, min, max) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return min + (hash % (max - min + 1));
}

function formatDateOffset(dateValue, offsetDays) {
  if (!dateValue) return null;

  const date = new Date(`${dateValue}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateValue;

  date.setUTCDate(date.getUTCDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

function normalizeCategory(event) {
  const classification = event.classifications?.find((item) => item.primary) ?? event.classifications?.[0];
  const values = [
    classification?.segment?.name,
    classification?.genre?.name,
    classification?.subGenre?.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (values.includes("music") || values.includes("concert")) return "music";
  if (values.includes("sport") || values.includes("basketball") || values.includes("football")) return "sporting";
  if (values.includes("business") || values.includes("conference")) return "business";
  if (values.includes("art") || values.includes("theatre") || values.includes("theater")) return "arts-festival";
  if (values.includes("food") || values.includes("culinary")) return "food";
  if (values.includes("auto") || values.includes("car")) return "auto-show";
  if (values.includes("motorsport") || values.includes("racing")) return "motorsport";
  if (values.includes("fair") || values.includes("festival")) return "fair";
  if (values.includes("family") || values.includes("miscellaneous")) return "general";

  return "general";
}

const cityToRegion = {
  gdansk: "pomorskie",
  gdynia: "pomorskie",
  sopot: "pomorskie",
  warsaw: "mazowieckie",
  warszawa: "mazowieckie",
  krakow: "malopolskie",
  "kraków": "malopolskie",
  wroclaw: "dolnoslaskie",
  "wrocław": "dolnoslaskie",
  poznan: "wielkopolskie",
  "poznań": "wielkopolskie",
  lodz: "lodzkie",
  "łódź": "lodzkie",
  katowice: "slaskie",
  lublin: "lubelskie",
  szczecin: "zachodniopomorskie",
  bydgoszcz: "kujawsko-pomorskie",
  torun: "kujawsko-pomorskie",
  "toruń": "kujawsko-pomorskie",
  bialystok: "podlaskie",
  "białystok": "podlaskie",
  kielce: "swietokrzyskie",
  olsztyn: "warminsko-mazurskie",
  opole: "opolskie",
  rzeszow: "podkarpackie",
  "rzeszów": "podkarpackie",
  "zielona gora": "lubuskie",
  "zielona góra": "lubuskie",
};

function normalizeRegion(city) {
  return cityToRegion[city?.toLowerCase()] ?? "mazowieckie";
}

function getBestImage(event) {
  const images = event.images ?? [];
  const preferred =
    images.find((image) => image.ratio === "16_9" && image.width >= 1000 && !image.fallback) ??
    images.find((image) => image.ratio === "16_9" && !image.fallback) ??
    images.find((image) => !image.fallback) ??
    images[0];

  return preferred?.url ?? null;
}

function getPrice(event) {
  const price = event.priceRanges?.find((item) => typeof item.min === "number");
  if (!price) return 0;
  return Math.round(price.min);
}

function mapTicketmasterEvent(event) {
  const venue = event._embedded?.venues?.[0];
  const city = venue?.city?.name ?? "Warsaw";
  const eventDate = event.dates?.start?.localDate;
  const eventTime = event.dates?.start?.localTime ?? "19:00:00";
  const maxParticipants = hashNumber(event.id, 120, 1200);
  const takenPlaces = hashNumber(`${event.id}-taken`, 20, Math.max(20, maxParticipants - 12));

  return {
    title: event.name,
    event_date: eventDate,
    event_time: eventTime,
    city,
    category: normalizeCategory(event),
    price: getPrice(event),
    max_participants: maxParticipants,
    taken_places: takenPlaces,
    deadline: event.sales?.public?.endDateTime?.slice(0, 10) ?? formatDateOffset(eventDate, -1),
    region: normalizeRegion(city),
    image_url: getBestImage(event),
  };
}

async function fetchTicketmasterEvents() {
  const apiKey = process.env.TICKETMASTER_API_KEY;

  if (!apiKey) {
    throw new Error("Missing TICKETMASTER_API_KEY in .env");
  }

  const countryCode = getArg("country", "PL");
  const city = getArg("city", "");
  const size = getArg("size", "10");
  const page = getArg("page", "0");
  const startDateTime = getArg("start", new Date().toISOString().slice(0, 19) + "Z");

  const params = new URLSearchParams({
    apikey: apiKey,
    countryCode,
    size,
    page,
    sort: "date,asc",
    startDateTime,
    includeTBA: "no",
    includeTBD: "no",
    includeTest: "no",
  });

  if (city) {
    params.set("city", city);
  }

  const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(`Ticketmaster request failed: ${response.status} ${JSON.stringify(payload)}`);
  }

  return payload._embedded?.events ?? [];
}

async function insertEvents(events) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data: existingEvents, error: loadError } = await supabase
    .from("events_list")
    .select("title, event_date, city");

  if (loadError) {
    throw loadError;
  }

  const existingKeys = new Set(
    (existingEvents ?? []).map((event) =>
      [event.title, event.event_date, event.city].join("|").toLowerCase()
    )
  );
  const newEvents = events.filter((event) => {
    const key = [event.title, event.event_date, event.city].join("|").toLowerCase();
    return event.title && event.event_date && !existingKeys.has(key);
  });

  if (newEvents.length === 0) {
    return { inserted: [], skipped: events.length };
  }

  const { data, error } = await supabase.from("events_list").insert(newEvents).select("title, event_date, city");

  if (error) {
    throw error;
  }

  return {
    inserted: data ?? [],
    skipped: events.length - newEvents.length,
  };
}

try {
  loadEnvFile();

  const dryRun = !process.argv.includes("--commit");
  const ticketmasterEvents = await fetchTicketmasterEvents();
  const mappedEvents = ticketmasterEvents.map(mapTicketmasterEvent);

  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, events: mappedEvents }, null, 2));
    console.log("Run with --commit to insert these events into Supabase.");
  } else {
    const result = await insertEvents(mappedEvents);
    console.log(JSON.stringify(result, null, 2));
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
