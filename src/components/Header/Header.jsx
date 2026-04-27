import React from "react";
import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Pages", to: "#" },
  { label: "Speakers", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Contact", to: "#" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="container header-shell">
        <Link to="/" className="logo-link">
          <span className="logo-mark">
            <img src={logo} alt="Event Hub" className="logo" />
          </span>
          <span className="logo-copy">
            <strong>Event Hub</strong>
            <span>Event operations platform</span>
          </span>
        </Link>

        <nav className="nav">
          {navItems.map((item) =>
            item.to === "#" ? (
              <a key={item.label} href="#" className="nav-link">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className="nav-link">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="bth">
          <Link to="/register" className="bthLog">
            Register
          </Link>
          <Link to="/login" className="bthReg">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
