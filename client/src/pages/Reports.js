import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./PageLayout.css";

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await api.get("/reports/summary");
        console.log("📊 Report API response:", response.data);
        setSummary(response.data.summary);
      } catch (err) {
        console.error("Error fetching report summary:", err);
        setError("Failed to load report summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="page">
      <h2>Reports</h2>

      {loading ? (
        <p>Loading report summary...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : !summary ? (
        <p>No data available.</p>
      ) : (
        <div className="card-container">
          <div className="card">Total Leads — {summary.totalLeads}</div>
          <div className="card">Total Deals — {summary.totalDeals}</div>
          <div className="card">
            Total Revenue — ₹{summary.totalRevenue.toLocaleString()}
          </div>

          <div className="card">
            <h4>Leads by Status:</h4>
            {summary.leadsByStatus.map((item) => (
              <p key={item._id}>
                {item._id}: {item.count}
              </p>
            ))}
          </div>

          <div className="card">
            <h4>Deals by Stage:</h4>
            {summary.dealsByStage.map((item) => (
              <p key={item._id}>
                {item._id}: {item.count}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
