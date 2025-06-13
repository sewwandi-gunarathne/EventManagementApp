import 'reactjs-popup/dist/index.css';
import Link from 'next/link';
import Popup from 'reactjs-popup';

export default function EventsForm({
    mutation, setShowPopup, popupMessage, showPopup, 
    upcomingEvents, pastEvents, deletingEventId

}) {
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
                                <p>Last Updated: {event.lastUpdated}</p>
                                <button
                                    onClick={() => mutation.mutate(event)}
                                    disabled={mutation.isLoading}
                                    className="button button-delete"
                                >
                                    {deletingEventId === event.id ? 'Deleting...' : 'Delete Event'}
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
                                    {deletingEventId === event.id ? 'Deleting...' : 'Delete Event'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No past events.</p>
                    )}
                </div>
            </div>

            <Popup open={showPopup} closeOnDocumentClick onClose={() => setShowPopup(false)}>

                <div className="model">
                    <a className="close" onClick={() => setShowPopup(false)}>&times;</a>
                    <div className="content">{popupMessage}</div>
                    <div className="actions">
                        <button className="button button-ok" onClick={() => setShowPopup(false)}>
                            OK
                        </button>
                    </div>
                </div>
            </Popup>
            <div>
                <Link href="/">
                    <button className="button-link">Back to Home</button>
                </Link>
            </div>

        </div>
    );
}