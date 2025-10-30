import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Deals.css";

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get("/deals");
        console.log("📦 Deals API Response:", response.data);

        let data = [];

        // Handle all possible response formats
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (Array.isArray(response.data?.deals)) {
          data = response.data.deals;
        } else if (Array.isArray(response.data?.data)) {
          data = response.data.data;
        }

        setDeals(data);
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("Failed to load deals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="page">
      <h2>Deals</h2>

      {loading ? (
        <p>Loading deals...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        <div className="card-container">
          {deals.map((deal) => (
            <div key={deal._id} className={`card status-${deal.stage?.toLowerCase() || "unknown"}`}>
              <h3>{deal.title || "Untitled Deal"}</h3>
              <p>
                <strong>Amount:</strong> ₹{deal.amount || "N/A"}
              </p>
              <p>
                <strong>Stage:</strong> {deal.stage || "N/A"}
              </p>
              <p>
                <strong>Lead:</strong> {deal.lead?.name || "N/A"}
              </p>
              <p>
                <strong>Owner:</strong> {deal.createdBy?.name || "Unassigned"}
              </p>
              {deal.expectedCloseDate && (
                <p>
                  <strong>Expected Close:</strong>{" "}
                  {new Date(deal.expectedCloseDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;
