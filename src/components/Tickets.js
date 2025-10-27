import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../utils/tickets";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    setTickets(getTickets());
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!["open", "in_progress", "closed"].includes(formData.status))
      newErrors.status = "Invalid status";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editingTicket) {
        updateTicket(editingTicket.id, formData);
        setToast({ type: "success", message: "Ticket updated successfully!" });
      } else {
        addTicket(formData);
        setToast({ type: "success", message: "Ticket created successfully!" });
      }
      loadTickets();
      resetForm();
    } catch (error) {
      setToast({
        type: "error",
        message: "Failed to save ticket. Please try again.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
    setShowForm(false);
    setEditingTicket(null);
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || "",
      status: ticket.status,
      priority: ticket.priority || "medium",
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        deleteTicket(id);
        loadTickets();
        setToast({ type: "success", message: "Ticket deleted successfully!" });
      } catch (error) {
        setToast({
          type: "error",
          message: "Failed to delete ticket. Please try again.",
        });
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "open":
        return "status-open";
      case "in_progress":
        return "status-in_progress";
      case "closed":
        return "status-closed";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="tickets-header">
        <h1>Ticket Management</h1>
        <Link to="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </Link>
      </div>

      <section className="section">
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? "Cancel" : "Create New Ticket"}
        </button>

        {showForm && (
          <div className="ticket-form-container">
            <h3>{editingTicket ? "Edit Ticket" : "Create New Ticket"}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                {errors.title && <div className="error">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.status && <div className="error">{errors.status}</div>}
              </div>
              <div className="form-group">
                <label>Priority:</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingTicket ? "Update" : "Create"} Ticket
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h4>{ticket.title}</h4>
              <p>{ticket.description}</p>
              <div className="ticket-meta">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusClass(ticket.status)}>
                    {ticket.status.replace("_", " ")}
                  </span>
                </p>
                <p>
                  <strong>Priority:</strong> {ticket.priority}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="ticket-actions">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="btn btn-secondary"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="empty-state">
            <p>No tickets found. Create your first ticket!</p>
          </div>
        )}
      </section>

      {toast && (
        <div className={`toast ${toast.type} show`}>{toast.message}</div>
      )}
    </div>
  );
};

export default Tickets;
