'use client';

import { useState } from "react";
import Link from "next/link";

export default function BookPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),
      ...formData
    };

    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    alert("Booking submitted!");

    
    setFormData({
      name: "",
      email: ""
    });
  };

  return (
    <div className="form-container">
      <h2>Book an Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="button-link">Submit Booking</button>

        <Link href="/">
          <button type="button" className="button-link">Back to Home</button>
        </Link>
      </form>
    </div>
  );
}
