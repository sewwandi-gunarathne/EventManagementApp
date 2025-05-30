"use client";
import events from '../data/events.json';
import { deleteEvent } from '../lib/deleteEvent';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split('.');
  return new Date(`${year}-${month}-${day}`);
}

export default function EventsPage() {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      alert('Event Deleted Successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },

    onError: (error) => {
      console.error("Deletion failed", error);
      alert(error.response?.data?.message || error.message || 'Failed to Delete Event');
    },

  })

  const today = new Date();

  const upcomingEvents = events.filter(event => parseCustomDate(event.date) >= today);
  const pastEvents = events.filter(event => parseCustomDate(event.date) < today);

  return (
    <div className="container">
      <h2> All Events</h2>


      <div>
        <h3> Upcoming Events</h3>
        <div className="cards">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
              <div key={event.id} className="card">
                <a href={`/events/${event.id}`}>{event.name}</a>
                <p>{event.date} at {event.time}</p>
                <button
                  onClick={() => mutation.mutate(event)}
                  disabled={mutation.isLoading}
                  className="button button-delete"
                >
                  {mutation.isLoading ? 'Deleting...' : 'Delete Event'}
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
      </div>


      <div style={{ marginTop: '2rem' }}>
        <h3> Past Events</h3>
        <div className="cards">
          {pastEvents.length > 0 ? (
            pastEvents.map(event => (
              <div key={event.id} className="card" style={{ backgroundColor: '#f0f0f0' }}>
                <a href={`/events/${event.id}`}>{event.name}</a>
                <p>{event.date} at {event.time}</p>
                <button
                  onClick={() => mutation.mutate(event)}
                  disabled={mutation.isLoading}
                  className="button button-delete"
                >
                  {mutation.isLoading ? 'Deleting...' : 'Delete Event'}
                </button>
              </div>
            ))
          ) : (
            <p>No past events.</p>
          )}
        </div>
      </div>
    </div>
  );
}
