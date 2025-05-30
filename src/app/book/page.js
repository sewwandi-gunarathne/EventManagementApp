"use client";

import { useState } from "react";
import { useTransition } from "react"; 
import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import Link from "next/link";


export default function BookPage() {
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    email: ""
  });
const [isPending, startTransition] = useTransition();
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/bookEvent', formData);
      return response.data;
    },
    onSuccess: () => {
      alert('Booking Success')
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Booking Failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
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
              onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
              required
              //readOnly={!!eventIdFromQuery}  make read-only if prefilled
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </label>
        </div>

        <button type="submit" className="button-link" disabled={isPending}>
          {mutation.isPending ? "Submitting..." : "Submit Booking"}
        </button>

        <Link href="/">
          <button type="button" className="button-link">Back to Home</button>
        </Link>
      </form>
    </div>
  );
}
