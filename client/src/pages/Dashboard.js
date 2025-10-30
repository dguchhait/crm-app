import React from "react";
import DealsChart from "../components/Charts/DealsChart";
import SalesReportChart from "../components/Charts/SalesReportChart";
import "./PageLayout.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h2>Admin Dashboard</h2>
      <div className="card-container">
        <div className="card">
          <DealsChart />
        </div>
        <div className="card">
          <SalesReportChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
