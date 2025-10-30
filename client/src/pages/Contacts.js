import React, { useEffect, useState } from "react";
import api from "../api/axios";


const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/contacts");
console.log("📦 Contact API response:", response.data);

const data =
  Array.isArray(response.data)
    ? response.data
    : response.data.contacts || response.data.data;

setContacts(data || []);

      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contacts-page">
      <h2>Contacts</h2>

      {loading ? (
        <p className="loading">Loading contacts...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : contacts.length === 0 ? (
        <p className="no-data">No contacts found.</p>
      ) : (
        <div className="contacts-card-container">
          {contacts.map((contact) => (
            <div key={contact._id} className="contacts-card">
              <h3>{contact.name}</h3>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Phone:</strong> {contact.phone || "N/A"}</p>
              <p><strong>Company:</strong> {contact.company || "N/A"}</p>
              <p><strong>Position:</strong> {contact.position || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;
