import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLongRight,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineDocumentDuplicate,
  HiOutlineSparkles,
  HiOutlineTicket,
} from "react-icons/hi2";
import "./Welcome.css";

const stats = [
  { value: "Poland", label: "events from cities across the country" },
  { value: "Categories", label: "music, sport, culture, and more" },
  { value: "Responsive", label: "built for phone and desktop browsing" },
];

const featureSections = [
  {
    eyebrow: "Browse events",
    title: "Find local events in one simple feed.",
    text:
      "See upcoming concerts, meetups, and activities from across Poland. The list is easy to scan and helps you compare dates, cities, and venues quickly.",
    cta: "View events",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineCalendarDays,
    reverse: false,
  },
  {
    eyebrow: "Categories",
    title: "Filter events by type and interest.",
    text:
      "Switch between categories like music, sport, culture, and family-friendly events to find what fits your plans.",
    cta: "Choose category",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineTicket,
    reverse: true,
  },
  {
    eyebrow: "Event details",
    title: "Open an event to read the full info.",
    text:
      "Each event page shows the date, venue, and a short description so you can see the essentials in one place.",
    cta: "Open details",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineDocumentDuplicate,
    reverse: false,
  },
  {
    eyebrow: "Responsive UI",
    title: "A clean layout for both mobile and desktop.",
    text:
      "The interface is designed for casual browsing, with a simple structure that works well on phones and laptops.",
    cta: "Try it now",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineSparkles,
    reverse: true,
  },
];

const extraFeatures = [
  "User accounts for saved events",
  "Better search by city and date",
  "More sources beyond Ticketmaster",
  "Map view for local event browsing",
];

export default function Welcome() {
  return (
    <section className="welcome-page">
      <div className="welcome-orb welcome-orb-one" />
      <div className="welcome-orb welcome-orb-two" />

      <div className="welcome-shell">
        <div className="welcome-copy">
          <span className="welcome-badge">
            <HiOutlineSparkles />
            Event discovery for Poland
          </span>

          <h1>
            Find events across Poland
            <br />
            from music to local meetups.
          </h1>

          <p className="welcome-lead">
            Event Hub is a student project for browsing events, filtering by category,
            and reading event details without extra clutter.
          </p>

          <div className="welcome-actions">
            <Link to="/events" className="welcome-primary">
              Browse events
              <HiOutlineArrowLongRight />
            </Link>
            <Link to="/events" className="welcome-secondary">
              Explore the app
            </Link>
          </div>

          <div className="welcome-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="welcome-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="welcome-visual">
          <div className="welcome-stage">
            <div className="welcome-stage-header">
              <span className="welcome-stage-label">App preview</span>
              <div className="welcome-stage-pills">
                <span>Events</span>
                <span>Filters</span>
                <span>Details</span>
              </div>
            </div>

            <div className="welcome-stage-hero">
              <img
                src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80"
                alt="People browsing events online"
              />
              <div className="welcome-stage-overlay">
                <div className="welcome-stage-feature">
                  <HiOutlineCalendarDays />
                  Browse by date and city
                </div>
                <div className="welcome-stage-feature">
                  <HiOutlineChartBarSquare />
                  Simple event details view
                </div>
              </div>
            </div>

            <div className="welcome-stage-grid">
              <article className="welcome-panel">
                <h3>Browse local events</h3>
                <p>Explore listings from Polish cities with a clean event card layout.</p>
              </article>
              <article className="welcome-panel">
                <h3>Filter by interest</h3>
                <p>Choose the type of event you want without getting lost in extra menus.</p>
              </article>
              <article className="welcome-panel">
                <h3>Read event details</h3>
                <p>Open any event to see the venue, date, and a short description.</p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome-sections">
        {featureSections.map(({ eyebrow, title, text, cta, image, icon: Icon, reverse }) => (
          <section
            key={title}
            className={`welcome-section-card ${reverse ? "welcome-section-card-reverse" : ""}`}
          >
            <div className="welcome-section-media">
              <img src={image} alt={title} />
            </div>

            <div className="welcome-section-content">
              <span className="welcome-section-eyebrow">{eyebrow}</span>
              <div className="welcome-section-icon">
                {React.createElement(Icon)}
              </div>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link to="/events" className="welcome-inline-link">
                {cta}
                <HiOutlineArrowLongRight />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="welcome-bottom">
        <div className="welcome-bottom-copy">
          <span className="welcome-bottom-eyebrow">How it works</span>
          <h2>Events are collected and shown in one interface.</h2>
          <p>
            The app fetches event data from external sources and displays it in a
            simple event discovery layout. It uses React, Supabase, Ticketmaster API,
            and is meant to be a practical student project for exploring events in Poland.
          </p>
        </div>

        <div className="welcome-bottom-card">
          <div className="welcome-bottom-header">
            <HiOutlineDocumentDuplicate />
            Technologies and next steps
          </div>

          <div className="welcome-extra-list">
            {extraFeatures.map((feature) => (
              <div key={feature} className="welcome-extra-item">
                <HiOutlineSparkles />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/events" className="welcome-primary welcome-bottom-cta">
            Browse events
            <HiOutlineArrowLongRight />
          </Link>
        </div>
      </section>
    </section>
  );
}
