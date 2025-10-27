import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Ticket Management System</h1>
            <p>Efficiently manage your support tickets with our comprehensive platform.</p>
            <div className="cta-buttons">
              <Link to="/auth/login" className="btn btn-primary">Login</Link>
              <Link to="/auth/signup" className="btn btn-secondary">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="wave"></div>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid">
            <div className="card">
              <h3>Easy Ticket Creation</h3>
              <p>Create and manage tickets with our intuitive interface.</p>
            </div>
            <div className="card">
              <h3>Real-time Updates</h3>
              <p>Track ticket status and updates in real-time.</p>
            </div>
            <div className="card">
              <h3>Comprehensive Dashboard</h3>
              <p>Get insights with detailed statistics and reports.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Ticket Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
