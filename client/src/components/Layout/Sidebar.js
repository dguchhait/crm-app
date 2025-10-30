import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onLinkClick }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul>
        <li>
          <Link to="/dashboard" onClick={onLinkClick}>Dashboard</Link>
        </li>
        <li>
          <Link to="/leads" onClick={onLinkClick}>Leads</Link>
        </li>
        <li>
          <Link to="/deals" onClick={onLinkClick}>Deals</Link>
        </li>
        <li>
          <Link to="/contacts" onClick={onLinkClick}>Contacts</Link>
        </li>
        <li>
          <Link to="/reports" onClick={onLinkClick}>Reports</Link>
        </li>
        <li>
          <Link to="/users" onClick={onLinkClick}>Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
