import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get("/leads");

        console.log("API raw response:", response.data);

        // ✅ Access leads from `response.data.data`
        const data = response.data?.data || [];

        if (Array.isArray(data)) {
          setLeads(data);
        } else {
          console.warn("Unexpected leads response:", response.data);
          setLeads([]);
        }
      } catch (error) {
        console.error("Error fetching leads:", error);
        setError("Failed to load leads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="leads-page">
      <h2>Leads</h2>

      {loading ? (
        <p className="loading">Loading leads...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : leads.length === 0 ? (
        <p className="no-data">No leads found.</p>
      ) : (
        <div className="lead-card-container">
          {leads.map((lead) => (
            <div key={lead._id} className="lead-card">
              <h3>{lead.name}</h3>
              <p>
                <strong>Status:</strong> {lead.status || "N/A"}
              </p>
              <p>
                <strong>Source:</strong> {lead.source || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {lead.email || "N/A"}
              </p>
              {lead.phone && (
                <p>
                  <strong>Phone:</strong> {lead.phone}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leads;
