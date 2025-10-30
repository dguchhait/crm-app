import React from "react";
import "./Navbar.css";


const Navbar = ({ username = "Admin", onLogout, onToggleSidebar }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="navbar-title">CRM Dashboard</h1>
      </div>

      <div className="navbar-right">
        <span className="navbar-user">Welcome</span>
        
      </div>
    </header>
  );
};

export default Navbar;
