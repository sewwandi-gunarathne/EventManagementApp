"use client";

import { useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from './upload';
import axios from 'axios';

function formatTime(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "P.M" : "A.M";
  hour = hour % 12 || 12;
  return `${hour}.${minute} ${ampm}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef();

  const mutation = useMutation({
      mutationFn: async (finalEvent) => {
        const response = await axios.post('/api/createEvent', finalEvent);
        return response.data;
      },
      onSuccess: () => {
        alert('Event Created')
      },
      onError: (error) => {
        alert(error.response?.data?.message || 'Failed to Create Event');
      },
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
      location: "",
      description: ""
    });
    setImageFile(null);
    setUploadedImage(null);
    fileInputRef.current.value = ""; // Reset file input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.description || !imageFile) {
      setError("Please fill all fields and select an image.");
      return;
    }

    setError(""); // Clear previous error
    const formattedTime = formatTime(formData.time);
    const formattedDate = formatDate(formData.date);

    const form = new FormData();
    form.append("image", imageFile);
    form.append("eventName", formData.name);

    startTransition(async () => {
      const imageResult = await uploadImage(form);

      if (!imageResult.success) {
        setError("Image upload failed!");
        return;
      }

      const finalEvent = {
        ...formData,
        time: formattedTime,
        date: formattedDate,
        image: imageResult.fileName 
      };

      mutation.mutate(finalEvent);
      setUploadedImage(imageResult.fileName);
    });
  };

  return (
    <div className="form-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

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

        <div className="form-group">
          <label>
            Image:
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" ref={fileInputRef} />
          </label>
        </div>

        <button type="submit" className="button-link" disabled={isPending}>
          {isPending || mutation.isPending? "Creating..." : "Create Event"}
        </button>
      </form>

      

      <Link href="/admin">
        <button type="button">Back to Admin</button>
      </Link>
    </div>
  );
}