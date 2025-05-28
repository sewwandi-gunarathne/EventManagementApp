import events from '../data/events.json';

function parseCustomDate(dateStr) {
  const [day, month, year] = dateStr.split('.'); 
  return new Date(`${year}-${month}-${day}`);    
}

export default function EventsPage() {
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
