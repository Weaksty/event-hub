import React, { useEffect, useMemo, useState } from "react";
import { publicSupabase } from "./supabaseClient";
import Article from "./Article";
import "./Article.css";

const attendanceRanges = {
  "500-": { min: 0, max: 499 },
  "500-999": { min: 500, max: 999 },
  "1000-1999": { min: 1000, max: 1999 },
  "2000-4999": { min: 2000, max: 4999 },
  "5000-7499": { min: 5000, max: 7499 },
  "7500-9999": { min: 7500, max: 9999 },
  "10000-19999": { min: 10000, max: 19999 },
  "20000-49999": { min: 20000, max: 49999 },
  "50000-99999": { min: 50000, max: 99999 },
  "100000+": { min: 100000, max: Infinity },
};

export default function GetEventsList({ filters, view }) {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function getSupaBaseList() {
      setLoading(true);

      const { data, error } = await publicSupabase
        .from("events_list")
        .select(
          `
            *,
            event_images!event_images_event_id_fkey (
              url,
              order_index
            )
          `
        )
        .limit(21);

      if (error) {
        console.error("Events load error:", error);
        setLoadError(error.message);
        setAllEvents([]);
        setLoading(false);
        return;
      }

      setLoadError("");
      setAllEvents(data ?? []);
      setLoading(false);
    }

    getSupaBaseList();
  }, []);

  const filteredEvents = useMemo(() => {
    const result = allEvents.filter((event) => {
      if (filters?.category?.length > 0 && !filters.category.includes(event.category)) {
        return false;
      }

      if (filters?.region?.length > 0 && !filters.region.includes(event.region)) {
        return false;
      }

      if (filters?.attendance?.length > 0) {
        const match = filters.attendance.some((rangeKey) => {
          const range = attendanceRanges[rangeKey];
          return event.taken_places >= range.min && event.taken_places <= range.max;
        });

        if (!match) return false;
      }

      if (filters?.date && event.event_date < filters.date) {
        return false;
      }

      if (filters?.dateTo && event.event_date > filters.dateTo) {
        return false;
      }

      return true;
    });

    switch (filters.sortBy) {
      case "DeadlineSoonestFirst":
        return result.sort((a, b) => a.deadline.localeCompare(b.deadline));
      case "three":
        return result.sort((a, b) => b.deadline.localeCompare(a.deadline));
      case "four":
        return result.sort((a, b) => a.title.localeCompare(b.title));
      case "five":
        return result.sort((a, b) => b.title.localeCompare(a.title));
      case "six":
        return result.sort((a, b) => a.taken_places - b.taken_places);
      case "seven":
        return result.sort((a, b) => b.taken_places - a.taken_places);
      case "eight":
        return result.sort((a, b) => b.price - a.price);
      case "nine":
        return result.sort((a, b) => a.price - b.price);
      default:
        return result;
    }
  }, [allEvents, filters]);

  function formatDate(value) {
    if (!value) return "Date TBD";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);
  }

  function formatDeadline(value) {
    if (!value) return "Reg. Deadline: TBD";
    return `Reg. Deadline: ${formatDate(value)}`;
  }

  function formatAttendance(value) {
  if (value == null) return "Attendance TBD";

  if (typeof value !== "number" || Number.isNaN(value)) {
    return "Invalid attendance";
  }

  const formatted = new Intl.NumberFormat(undefined).format(value);

  return value > 0 ? `${formatted}+` : formatted;
}

function getEventImage(event) {
  if (event.image_url) {
    return event.image_url;
  }

  if (!event.event_images?.length) {
    return null;
  }

  const sortedImages = [...event.event_images].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );

  return sortedImages[0]?.url ?? null;
}

  if (loading) {
    return <p>loading...</p>;
  }

  if (loadError) {
    return <p>Could not load events: {loadError}</p>;
  }

  if (filteredEvents.length === 0) {
    const hasActiveFilters =
      filters?.category?.length ||
      filters?.region?.length ||
      filters?.attendance?.length ||
      filters?.date ||
      filters?.dateTo;

    return (
      <p>
        {hasActiveFilters
          ? "No events found for the selected filters."
          : "No events available yet."}
      </p>
    );
  }


  return (
    <>
      {filteredEvents.map((event) => (
        <Article
          key={event.id}
          image={getEventImage(event)}
          category={event.category}
          title={event.title}
          date={formatDate(event.event_date)}
          deadline={formatDeadline(event.deadline)}
          taken_places={formatAttendance(event.taken_places)}
          city={event.city}
          view={view}
        />
      ))}
    </>
  );
}
