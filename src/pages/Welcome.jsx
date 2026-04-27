import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLongRight,
  HiOutlineCalendarDays,
  HiOutlineChartBarSquare,
  HiOutlineDocumentDuplicate,
  HiOutlineMap,
  HiOutlineMegaphone,
  HiOutlineSparkles,
  HiOutlineTicket,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import "./Welcome.css";

const stats = [
  { value: "24k+", label: "event launches and updates tracked each month" },
  { value: "80%", label: "less admin time when workflows are centralized" },
  { value: "110k+", label: "buyers, vendors, and partners in the wider ecosystem" },
];

const featureSections = [
  {
    eyebrow: "Modern Ticketing",
    title: "Sell faster with a cleaner mobile-first buying flow.",
    text:
      "Create rich landing pages, keep checkout in a single focused view, promote events with built-in marketing modules, and support scanning, box office activity, and live stats without switching between five different tools.",
    cta: "Explore ticketing",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineTicket,
    reverse: false,
  },
  {
    eyebrow: "Operations",
    title: "Replace scattered admin with one calmer command center.",
    text:
      "Bring applications, sponsorship requests, participant review, payments, agreements, and approval steps into one streamlined workflow so your team can move quickly without chasing forms across inboxes and spreadsheets.",
    cta: "See workflow tools",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineUserGroup,
    reverse: true,
  },
  {
    eyebrow: "Interactive Mapping",
    title: "Turn layouts into an event guide people actually use.",
    text:
      "Build editable maps, assign booths or activations visually, and feed that structure into a mobile-friendly guide with schedules, directories, sponsors, FAQs, and engagement analytics that help you see what attracts attention.",
    cta: "Learn about maps",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineMap,
    reverse: false,
  },
  {
    eyebrow: "Marketplace",
    title: "Make your opportunities easier to discover.",
    text:
      "Showcase sponsorship packages, booth inventory, and participation openings in a more visible way so brands and buyers can find the right event faster and reach out with better context from the start.",
    cta: "Browse marketplace",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    icon: HiOutlineMegaphone,
    reverse: true,
  },
];

const extraFeatures = [
  "Flexible applications for vendors, sponsors, performers, and parade participants",
  "Revenue dashboard with filters, exports, and clearer event-level reporting",
  "Live floor planning tools for booth inventory and placement management",
  "Digital content packs and sponsor asset delivery in one branded hub",
  "Document review with approvals, revisions, read receipts, and eSign support",
  "Sharper attendee experience with schedules, directories, and mobile-friendly guides",
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
            Streamlined event operations
          </span>

          <h1>
            One polished platform
            <br />
            for ticketing, planning,
            <br />
            mapping, and growth.
          </h1>

          <p className="welcome-lead">
            Event Hub helps teams run events with less chaos and stronger presentation.
            Bring ticket sales, participant management, maps, sponsor visibility, and
            event content into one modern workflow that feels clear from day one.
          </p>

          <div className="welcome-actions">
            <Link to="/register" className="welcome-primary">
              Start Free Demo
              <HiOutlineArrowLongRight />
            </Link>
            <Link to="/events" className="welcome-secondary">
              Browse Platform Preview
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
              <span className="welcome-stage-label">Platform Snapshot</span>
              <div className="welcome-stage-pills">
                <span>Ticketing</span>
                <span>Operations</span>
                <span>Guides</span>
              </div>
            </div>

            <div className="welcome-stage-hero">
              <img
                src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1400&q=80"
                alt="Crowd enjoying a well-organized event"
              />
              <div className="welcome-stage-overlay">
                <div className="welcome-stage-feature">
                  <HiOutlineCalendarDays />
                  Timed entry and scheduled programming
                </div>
                <div className="welcome-stage-feature">
                  <HiOutlineChartBarSquare />
                  Real-time numbers and cleaner reporting
                </div>
              </div>
            </div>

            <div className="welcome-stage-grid">
              <article className="welcome-panel">
                <h3>Fast purchase path</h3>
                <p>Shorter checkout flow, richer landing pages, and mobile-first ticket scanning.</p>
              </article>
              <article className="welcome-panel">
                <h3>Centralized admin</h3>
                <p>Applications, documents, payments, approvals, and sponsor tasks stay in one place.</p>
              </article>
              <article className="welcome-panel">
                <h3>Interactive guides</h3>
                <p>Maps, schedules, vendor listings, and sponsor modules built for attendees on the move.</p>
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
                <Icon />
              </div>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link to="/register" className="welcome-inline-link">
                {cta}
                <HiOutlineArrowLongRight />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <section className="welcome-bottom">
        <div className="welcome-bottom-copy">
          <span className="welcome-bottom-eyebrow">More built in</span>
          <h2>More value in the stack, not more tabs in your browser.</h2>
          <p>
            Event Hub was shaped around real producer workflows. That means the
            product focuses on reducing back-and-forth, making event data easier to
            manage, and giving every public-facing touchpoint a cleaner, more modern feel.
          </p>
        </div>

        <div className="welcome-bottom-card">
          <div className="welcome-bottom-header">
            <HiOutlineDocumentDuplicate />
            Additional capabilities
          </div>

          <div className="welcome-extra-list">
            {extraFeatures.map((feature) => (
              <div key={feature} className="welcome-extra-item">
                <HiOutlineSparkles />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <Link to="/register" className="welcome-primary welcome-bottom-cta">
            Request a Demo
            <HiOutlineArrowLongRight />
          </Link>
        </div>
      </section>
    </section>
  );
}
