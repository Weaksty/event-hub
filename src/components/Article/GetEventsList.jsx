import React, { useEffect, useMemo, useState } from "react";
import { publicSupabase } from "./supabaseClient";
import Article from "./Article";
import "./Article.css";

const PAGE_SIZE = 12;

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

function applyFilters(query, filters) {
  let nextQuery = query;

  if (filters?.category?.length > 0) {
    nextQuery = nextQuery.in("category", filters.category);
  }

  if (filters?.region?.length > 0) {
    nextQuery = nextQuery.in("region", filters.region);
  }

  if (filters?.date) {
    nextQuery = nextQuery.gte("event_date", filters.date);
  }

  if (filters?.dateTo) {
    nextQuery = nextQuery.lte("event_date", filters.dateTo);
  }

  if (filters?.attendance?.length > 0) {
    const ranges = filters.attendance
      .map((rangeKey) => attendanceRanges[rangeKey])
      .filter(Boolean)
      .map((range) => {
        if (range.max === Infinity) {
          return `taken_places.gte.${range.min}`;
        }

        return `and(taken_places.gte.${range.min},taken_places.lte.${range.max})`;
      });

    if (ranges.length > 0) {
      nextQuery = nextQuery.or(ranges.join(","));
    }
  }

  return nextQuery;
}

function applySort(query, sortBy) {
  switch (sortBy) {
    case "three":
      return query.order("deadline", { ascending: false });
    case "four":
      return query.order("title", { ascending: true });
    case "five":
      return query.order("title", { ascending: false });
    case "six":
      return query.order("taken_places", { ascending: true });
    case "seven":
      return query.order("taken_places", { ascending: false });
    case "eight":
      return query.order("price", { ascending: false });
    case "nine":
      return query.order("price", { ascending: true });
    case "ten":
      return query.order("event_date", { ascending: false });
    case "DeadlineSoonestFirst":
    default:
      return query.order("deadline", { ascending: true });
  }
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    pages.push("start-ellipsis");
  }

  for (let pageNumber = start; pageNumber <= end; pageNumber += 1) {
    pages.push(pageNumber);
  }

  if (end < totalPages - 1) {
    pages.push("end-ellipsis");
  }

  pages.push(totalPages);
  return pages;
}

export default function GetEventsList({ filters, view }) {
  const [events, setEvents] = useState([]);
  const [pageState, setPageState] = useState({ filterKey: "", page: 1 });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const filterKey = useMemo(() => JSON.stringify(filters ?? {}), [filters]);
  const page = pageState.filterKey === filterKey ? pageState.page : 1;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const visiblePages = getVisiblePages(page, totalPages);

  useEffect(() => {
    async function getSupaBaseList() {
      setLoading(true);
      const today = new Date().toISOString().slice(0, 10);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let eventsQuery = publicSupabase
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
        .gte("deadline", today);

      let countQuery = publicSupabase
        .from("events_list")
        .select("id", { count: "exact", head: true })
        .gte("deadline", today);

      eventsQuery = applyFilters(eventsQuery, filters);
      eventsQuery = applySort(eventsQuery, filters?.sortBy);
      eventsQuery = eventsQuery.range(from, to);

      countQuery = applyFilters(countQuery, filters);

      const [eventsResult, countResult] = await Promise.all([eventsQuery, countQuery]);
      const { data, error } = eventsResult;
      const { count, error: countError } = countResult;

      if (error || countError) {
        const message = error?.message ?? countError.message;
        console.error("Events load error:", error ?? countError);
        setLoadError(message);
        setEvents([]);
        setTotalCount(0);
        setLoading(false);
        return;
      }

      setLoadError("");
      setEvents(data ?? []);
      setTotalCount(count ?? 0);
      setLoading(false);
    }

    getSupaBaseList();
  }, [filterKey, filters, page]);

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

  if (events.length === 0) {
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
      {events.map((event) => (
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

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Events pages">
          <button
            type="button"
            className="pagination-button"
            disabled={page === 1 || loading}
            onClick={() =>
              setPageState({
                filterKey,
                page: Math.max(1, page - 1),
              })
            }
          >
            Previous
          </button>

          <div className="pagination-pages">
            {visiblePages.map((pageItem) =>
              typeof pageItem === "number" ? (
                <button
                  type="button"
                  key={pageItem}
                  className={pageItem === page ? "pagination-page active" : "pagination-page"}
                  disabled={loading}
                  onClick={() => setPageState({ filterKey, page: pageItem })}
                >
                  {pageItem}
                </button>
              ) : (
                <span className="pagination-ellipsis" key={pageItem}>
                  ...
                </span>
              )
            )}
          </div>

          <button
            type="button"
            className="pagination-button"
            disabled={page === totalPages || loading}
            onClick={() =>
              setPageState({
                filterKey,
                page: Math.min(totalPages, page + 1),
              })
            }
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}
