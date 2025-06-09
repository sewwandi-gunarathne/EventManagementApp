"use client";

import { useState, useTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BookForm from "./BookForm";

export default function BookContainer() {
  const [formData, setFormData] = useState({
    eventId: "",
    name: "",
    email: ""
  });

  const [isPending, startTransition] = useTransition();
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/bookEvent', formData);
      return response.data;
    },
    onSuccess: () => {
      setPopupMessage("Booking Success");
      setShowPopup(true);
      resetForm();
    },
    onError: (error) => {
      setPopupMessage(error.response?.data?.message || 'Booking Failed');
      setShowPopup(true);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      eventId: "",
      name: "",
      email: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <BookForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isPending={isPending || mutation.isPending}
      popupMessage={popupMessage}
      showPopup={showPopup}
      closePopup={closePopup}
    />
  );
}
