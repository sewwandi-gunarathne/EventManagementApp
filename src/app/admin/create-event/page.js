'use client';
import { useState } from "react";
import Link from "next/link";

export default function CreateEventPage() {
    const [formData, setFormData] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem("newEvents")) || [];

        const newEvent = {
            id: Date.now(),
            ...formData
        };

        existing.push(newEvent);
        localStorage.setItem("newEvents", JSON.stringify(existing));

        alert("Event added");

        setFormData({
            name: "",
            date: "",
            time: "",
            location: "",
            description: ""
        });
    };


    return (
        <div className="form-container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Event Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Date:
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Time:
                        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Location:
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                </div>
                <button type="submit">Create Event</button>
            </form>

            <Link href="/admin">
                <button>Back to Admin</button>
            </Link>
        </div>
    );
}
