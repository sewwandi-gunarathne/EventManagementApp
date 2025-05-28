'use client';

import { useState, useTransition } from "react";
import Link from "next/link";
import { bookEvent } from "../actions/bookEvent"; 
export default function BookPage() {
  const [formData, setFormData] = useState({
    eventId:"",
    name: "",
    email: ""
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await bookEvent(formData);
      if (result.success) {
        alert("Booking submitted!");

        
        setFormData({
          eventId:"",
          name: "",
          email: ""
        });
      } else {
        alert("Booking failed!");
      }
    });
  };

  return (
    <div className="form-container">
      <h2>Book an Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Event ID:
            <input
              type="text"
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              required
            />
          </label>
        </div>

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

        <button type="submit" className="button-link" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Booking"}
        </button>

        <Link href="/">
          <button type="button" className="button-link">Back to Home</button>
        </Link>
      </form>
    </div>
  );
}
