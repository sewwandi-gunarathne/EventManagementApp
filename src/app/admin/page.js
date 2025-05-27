import bookings from '../data/bookings.json';
import Link from "next/link";
export default function AdminPage() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>All the booking will be listed here</p>
      <div className="cards">
        {bookings.map(booking => (
          <div key={booking.id} className="card">
            <a href={`/bookings/${booking.id}`}>Event ID : {booking.eventId}</a>
            <br /><br />
            <a href={`/bookings/${booking.id}`}> Booked By : {booking.name}</a>
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
