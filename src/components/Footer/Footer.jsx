import React from "react";
import "./Footer.css";
import facebook from "../../assets/face.png";
import telegram from "../../assets/tg.png";
import Instagram from "../../assets/insta.png";
import twitter from "../../assets/twitterx.png";
import { Link } from "react-router-dom";

const platformLinks = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Register", to: "/register" },
  { label: "Login", to: "/login" },
];

const productLinks = ["Ticketing", "Workflows", "Mapping", "Marketplace"];
const companyLinks = ["About", "Blog", "Partners", "Contact"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <h2>Event Hub</h2>
          <p>
            A polished event operations platform for ticketing, planning, mapping,
            sponsor visibility, and smoother team workflows.
          </p>

          <div className="social-icon">
            <a className="social-icon__link" href="#" aria-label="Facebook">
              <img src={facebook} alt="" />
            </a>
            <a className="social-icon__link" href="#" aria-label="Telegram">
              <img src={telegram} alt="" />
            </a>
            <a className="social-icon__link" href="#" aria-label="Instagram">
              <img src={Instagram} alt="" />
            </a>
            <a className="social-icon__link" href="#" aria-label="Twitter X">
              <img src={twitter} alt="" />
            </a>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h3>Platform</h3>
            <div className="footer-links">
              {platformLinks.map((link) => (
                <Link key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Solutions</h3>
            <div className="footer-links">
              {productLinks.map((item) => (
                <a key={item} href="#" className="footer-link">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <div className="footer-links">
              {companyLinks.map((item) => (
                <a key={item} href="#" className="footer-link">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Event Hub. Designed for producers who want calmer operations.</p>
        <div className="footer-bottom-links">
          <a href="#" className="footer-bottom-link">
            Privacy
          </a>
          <a href="#" className="footer-bottom-link">
            Terms
          </a>
          <a href="#" className="footer-bottom-link">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
