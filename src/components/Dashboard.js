import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getSession } from "../utils/auth";
import { getTicketStats } from "../utils/tickets";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setStats(getTicketStats());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const session = getSession();

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-welcome">
          <span>Welcome, {session?.user}!</span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <section className="section">
        <h2>Ticket Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Tickets</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card open">
            <h3>Open Tickets</h3>
            <p>{stats.open}</p>
          </div>
          <div className="stat-card in-progress">
            <h3>In Progress</h3>
            <p>{stats.inProgress}</p>
          </div>
          <div className="stat-card closed">
            <h3>Closed Tickets</h3>
            <p>{stats.closed}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <Link to="/tickets" className="btn btn-primary">
          Manage Tickets
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
