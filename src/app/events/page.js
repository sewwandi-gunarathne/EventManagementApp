
import EventsContainer from "./EventsContainer";

export const revalidate = 60; 

export default async function EventsPage() {
  const res = await fetch('http://localhost:3000/api/events', {
    next: { revalidate: 60 }, 
  });

  const events = await res.json();
  return <EventsContainer initialEvents={events} />;
}