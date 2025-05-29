import bookings from '../data/bookings.json';
import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>All the bookings will be listed here</p>
      <div className="cards">
        {bookings.map(booking => (
          <div key={booking.id} className="card">
            <h3>Event ID: {booking.eventId}</h3>
            <h3>Booked By: {booking.name}</h3>
          </div>
        ))}
      </div>
      <div>
        <Link href="/admin/create-event">
          <button>Add New Event</button>
        </Link>
        <br />
        <Link href="/">
          <button className="button-link">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
