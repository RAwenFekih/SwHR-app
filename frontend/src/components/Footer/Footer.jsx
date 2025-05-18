import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-heading">
          <img src={logo} alt="" className="logo_1"></img>
        </h3>
        <p>
          SW CONSULTING is a Tunisian company, we have been an IT service
          provider for more than 4 years. We meet almost all the needs of VSEs,
          SMEs, as well as large groups, regardless of their sector of activity.
        </p>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Quick Links</h3>
        <ul className="footer-links">
          <li>
            <Link
              to="hero"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
              tabIndex={0}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="programs"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
              tabIndex={0}
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              to="about"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
              tabIndex={0}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="company"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
              tabIndex={0}
            >
              Company
            </Link>
          </li>
          <li>
            <Link
              to="testimonials"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
              tabIndex={0}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              offset={-260}
              duration={500}
              className="footer-link"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h3 className="footer-heading">Contact</h3>
        <p>Email: contact@swconsultings.com</p>
        <p>Phone: +216 52 298 514</p>
        <div className="footer-social-icons" aria-label="Social media links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="footer-icon-link"
          >
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.675 0h-21.35C.588 0 0 .587 0 1.312v21.377C0 23.415.588 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.892-4.788 4.657-4.788 1.325 0 2.466.099 2.797.143v3.24h-1.918c-1.504 0-1.796.716-1.796 1.765v2.314h3.59l-.467 3.623h-3.123V24h6.116c.737 0 1.325-.585 1.325-1.311V1.312C24 .587 23.412 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer-icon-link"
          >
            <svg className="footer-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.23 0H1.77C.79 0 0 .774 0 1.732v20.535C0 23.227.79 24 1.77 24h20.46c.98 0 1.77-.773 1.77-1.733V1.732C24 .774 23.21 0 22.23 0zM7.09 20.452H3.551V9h3.54v11.452zM5.32 7.433a2.057 2.057 0 01-2.06-2.06c0-1.138.922-2.06 2.06-2.06 1.14 0 2.06.922 2.06 2.06 0 1.138-.922 2.06-2.06 2.06zM20.452 20.452h-3.54v-5.605c0-1.336-.027-3.055-1.86-3.055-1.863 0-2.148 1.452-2.148 2.953v5.707h-3.54V9h3.399v1.56h.048c.474-.9 1.632-1.85 3.36-1.85 3.593 0 4.256 2.364 4.256 5.438v6.303z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
