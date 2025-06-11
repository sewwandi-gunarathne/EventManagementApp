"use client";
import { useState } from 'react';
import events from '../data/events.json';
import { deleteEvent } from '../lib/deleteEvent';
import { useMutation } from '@tanstack/react-query';
import 'reactjs-popup/dist/index.css';
import EventsForm from './EventsForm';

function parseCustomDate(dateStr) {
    const [day, month, year] = dateStr.split(".");
    return new Date(`${year}-${month}-${day}`);
}

export default function EventsContainer() {
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState("");
    const [deletingEventId, setDeletingEventId] = useState(null);
    const [allEvents, setAllEvents] = useState(events);
    //const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteEvent,

        onMutate: (events) => {
            setDeletingEventId(events.id);
        },

        onSuccess: (_data, variables) => {
            setPopupMessage("Event Deleted Successfully");
            setShowPopup(true);
            setDeletingEventId(null);
            setAllEvents(prev => prev.filter(e => e.id !== variables.id));
            //alert('Event Deleted Successfully');
            //queryClient.invalidateQueries({ queryKey: ['events'] });
        },

        onError: (error) => {
            console.error("Deletion failed", error);
            setPopupMessage(error.response?.data?.message || 'Failed to Delete Event');
            setShowPopup(true);
            setDeletingEventId(null);
            //alert(error.response?.data?.message || error.message || 'Failed to Delete Event');
        },

    })

    const today = new Date();

    const upcomingEvents = allEvents.filter(event => parseCustomDate(event.date) >= today);
    const pastEvents = allEvents.filter(event => parseCustomDate(event.date) < today);

    return(
    <EventsForm 
    mutation={mutation}
    setShowPopup = {setShowPopup}
    popupMessage = {popupMessage}
    showPopup = {showPopup} 
    upcomingEvents={upcomingEvents}
    pastEvents={pastEvents}
    deletingEventId={deletingEventId}
    />
)
}

