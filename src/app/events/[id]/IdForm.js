import Link from "next/link";


export default function IdForm({ event }) {
    if (!event) {
        return <p>Event not found.</p>;
    }
    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.details}</p>
            {event.date && <p>Date and Time : {event.date} {event.time}</p>}
            {event.location && <p>Location : {event.location}</p>}
            <div>{event.image && (
                <img
                    src={event.image}
                    alt={event.name}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}</div>
            <Link href={`/book?eventId=${event.id}`}>
                <button className="button-link" style={{ marginRight: '10px' }}>Book this Event</button>
            </Link>
            <Link href="/">
                <button className="button-link">Back to Home</button>
            </Link>
        </div>
    );
}


