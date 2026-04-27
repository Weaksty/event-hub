import "./Article.css";
import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineTicket,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const fallbackImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80";

export default function Article({
  image,
  category,
  title,
  date,
  deadline,
  taken_places,
  city,
  view = "list",
}) {
  return (
    <article className="article event-card">
      <div className="imgContainer">
        <img src={image || fallbackImage} alt={title} className="article-image" />
      </div>

      <div className="article-content">
        <h2 className="article-title">{title}</h2>

        <div className="article-meta article-meta-top">
          <span className="article-meta-item article-date">
            <HiOutlineCalendarDays />
            {date}
          </span>
          <span className="article-dot" />
          <span className="article-meta-item article-deadline">{deadline}</span>
        </div>

        <div className="article-meta article-meta-bottom">
          <span className="article-meta-item article-category">
            <HiOutlineTicket />
            {category}
          </span>
          <span className="article-meta-item nowPeople">
            <HiOutlineUserGroup />
            {taken_places}
          </span>
          <span className="article-meta-item location">
            <HiOutlineMapPin />
            {city}
          </span>
        </div>
      </div>

      {view === "list" ? (
        <button className="article-button article-button-arrow" aria-label={`Open ${title}`}>
          <HiOutlineArrowRight />
        </button>
      ) : (
        <button className="article-button article-button-more">More</button>
      )}
    </article>
  );
}
