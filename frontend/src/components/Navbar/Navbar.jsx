import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import menu_icon from "../../assets/menu-icon.webp";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setSticky(true) : setSticky(false);
    });
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  return (
    <nav className={`container ${sticky ? "dark-nav" : ""}`}>
      <ScrollLink to="hero" smooth={true} offset={0} duration={500}>
        <img src={logo} alt="" className="logo" />
      </ScrollLink>
      <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
        <li>
          <ScrollLink to="hero" smooth={true} offset={0} duration={500}>
            Home
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="program" smooth={true} offset={-260} duration={500}>
            Programs
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="about" smooth={true} offset={-150} duration={500}>
            About Us
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="company" smooth={true} offset={-260} duration={500}>
            Company
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="testimonials"
            smooth={true}
            offset={-260}
            duration={500}
          >
            Testimonials
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-260}
            duration={500}
            className="btn"
          >
            Contact us
          </ScrollLink>
        </li>
        <li>
          <RouterLink to="/auth" className="btn">
            Sign In
          </RouterLink>
        </li>
      </ul>
      <img src={menu_icon} alt="" className="menu-icon" onClick={toggleMenu} />
    </nav>
  );
};

export default Navbar;
