import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getSession } from '../utils/auth';
import { getTicketStats } from '../utils/tickets';

const Dashboard = () => {
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    setStats(getTicketStats());
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const session = getSession();

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <h1>Dashboard</h1>
        <div>
          <span>Welcome, {session?.user}!</span>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      </header>

      <section className="section">
        <h2>Ticket Statistics</h2>
        <div className="grid">
          <div className="card">
            <h3>Total Tickets</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total}</p>
          </div>
          <div className="card">
            <h3>Open Tickets</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>{stats.open}</p>
          </div>
          <div className="card">
            <h3>In Progress</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>{stats.inProgress}</p>
          </div>
          <div className="card">
            <h3>Closed Tickets</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#95a5a6' }}>{stats.closed}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <Link to="/tickets" className="btn btn-primary">Manage Tickets</Link>
      </section>
    </div>
  );
};

export default Dashboard;
