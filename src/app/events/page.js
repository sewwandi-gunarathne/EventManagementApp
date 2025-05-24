import events from '../data/events.json';

export default function EventsPage() {
    return (
        <div className="container">
        <h2>All Events</h2>
        <div className="cards">
          {events.map(event => (
            <div key={event.id} className="card">
              <a href={`/events/${event.id}`}>{event.name}</a>
            </div>
          ))}
        </div>
      </div>
    );
}