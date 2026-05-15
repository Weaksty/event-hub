import React from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLongRight,
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineSparkles,
  HiOutlineTicket,
  HiOutlineUser,
  
} from "react-icons/hi2";
import "./AuthLayout.css";
import { IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const iconMap = {
  email: HiOutlineEnvelope,
  password: HiOutlineLockClosed,
  user: HiOutlineUser,
};

export default function AuthLayout({
  mode,
  title,
  subtitle,
  submitLabel,
  altLabel,
  altLink,
  altLinkText,
  fields,
  onSubmit,
  isSubmitting = false,
}) {

const isRegister = mode === "register";


  return (
    <section className="auth-page">
      <div className="auth-background auth-background-one" />
      <div className="auth-background auth-background-two" />

      <div className="auth-shell">
        <aside className="auth-hero">
          <div className="auth-brand-wrap">
            <Link to="/" className="auth-brand">
              <span className="auth-brand-mark"><IoArrowBack /></span>
              <span>Event Hub</span>
            </Link>

            <p className="auth-mini-note">
              Browse events in Poland.
            </p>
          </div>

          <div className="auth-hero-panels">
            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <HiOutlineTicket />
                Browse events by category
              </div>
              <div className="auth-feature-item">
                <HiOutlineSparkles />
                View event details
              </div>
              <div className="auth-feature-item">
                <HiOutlineArrowLongRight />
                Simple and responsive
              </div>
            </div>
          </div>
        </aside>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-eyebrow">{mode}</p>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <form
            className="auth-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.();
            }}
          >
            {fields.map((field) => {
              const Icon = iconMap[field.icon];

              return (
                <label key={field.name} className="auth-field">
                  <span>{field.label}</span>
                  <div className="auth-input-wrap">
                    <Icon />
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      minLength={field.minLength}
                      required={field.required}
                      autoComplete={field.autoComplete}
                    />
                  </div>
                </label>
              );
            })}

            <div className="auth-row">
              <label className="auth-check">
                <input type="checkbox" />
                <span>
                  {isRegister
                    ? "I agree to the terms and privacy policy"
                    : "Keep me signed in on this device"}
                </span>
              </label>

              {!isRegister && (
                <button type="button" className="auth-link-button">
                  Forgot password?
                </button>
              )}
            </div>

            <button type="submit" className="auth-submit" disabled={isSubmitting}>
              <span>{submitLabel}</span>
              <HiOutlineArrowLongRight />
            </button>
            

          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-socials">
            <button type="button" className="auth-social-button">
              <FcGoogle />
              Google
              
            </button>
            <button type="button" className="auth-social-button">
              <FaApple />
              Apple
            </button>
          </div>

          <p className="auth-alt-text">
            {altLabel} <Link to={altLink}>{altLinkText}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
