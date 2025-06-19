
'use client';

import { useState, useRef, useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from './upload';
import axios from 'axios';
//import CreateEventForm from './CreateEventForm';
import dynamic from "next/dynamic";

const CreateEventForm = dynamic(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./CreateEventForm'));
    }, 2000); 
  }), {
    loading: () => <p>Loading...</p>
  }
);

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

export default function CreateEventContainer() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef();

  const mutation = useMutation({
    mutationFn: async (finalEvent) => {
      const response = await axios.post('/api/createEvent', finalEvent);
      return response.data;
    },
    onSuccess: () => {
      setPopupMessage("Event Created");
      setShowPopup(true);
      resetForm();
    },
    onError: (error) => {
      setPopupMessage(error.response?.data?.message || 'Failed to Create Event');
      setShowPopup(true);
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
    fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.date || !formData.time || !formData.location || !formData.description || !imageFile) {
      setError("Please fill all fields and select an image.");
      return;
    }

    setError("");
    const formattedTime = formatTime(formData.time);
    const formattedDate = formatDate(formData.date);

    const form = new FormData();
    form.append("image", imageFile);
    form.append("eventName", formData.name);

    startTransition(async () => {
      const imageResult = await uploadImage(form);

      if (!imageResult.success) {
        setPopupMessage("Image upload failed!");
        setShowPopup(true);
        return;
      }

      const finalEvent = {
        ...formData,
        time: formattedTime,
        date: formattedDate,
        image: imageResult.fileName
      };

      mutation.mutate(finalEvent);
    });
  };

  return (
    <CreateEventForm
      formData={formData}
      error={error}
      isPending={isPending}
      mutationPending={mutation.isPending}
      handleChange={handleChange}
      handleImageChange={handleImageChange}
      handleSubmit={handleSubmit}
      fileInputRef={fileInputRef}
      showPopup={showPopup}
      popupMessage={popupMessage}
      setShowPopup={setShowPopup}
    />
  );
}
