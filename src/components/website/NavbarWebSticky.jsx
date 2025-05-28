import React from "react";
import { logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import '../../styles/Nav.css'

const NavbarWebSticky = ({ showSticky }) => {
  const navigate = useNavigate();

  return (
    <div className={`navbarForWeb stick ${showSticky ? "sticky" : "notSticky"}`}>
      <div className="logo">
        <Link to="/"><img src={logo} alt="" /></Link>
      </div>

      <nav>
        <ul>
          <li><Link smooth to="/#service">SERVICES</Link></li>
          <li><Link smooth to="/#doctor">DOCTORS</Link></li>
          <li><Link smooth to="/">PRICING</Link></li>
          <li><Link smooth to="/#about">ABOUT US</Link></li>
          <li><Link smooth to="/contact">CONTACT</Link></li>
        </ul>
      </nav>

      <div className="nav_btn">
        <button onClick={() => navigate("/auth")}>
          BOOK AN APPOINTMENT
        </button>
      </div>
    </div>
  );
}

export default NavbarWebSticky