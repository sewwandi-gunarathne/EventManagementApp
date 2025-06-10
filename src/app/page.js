import Link from "next/link";

export default function Home() {
  return (
    <div>
      <center><h2>Welcome to the Event Booking Applocation</h2></center>
      <div className="nav-links">
        <Link href="/events"><button className="button-navbar">View Events</button></Link>
        <Link href="/book"><button className="button-navbar">Book an Event</button></Link>
        <Link href="/admin"><button className="button-navbar">Admin</button></Link>
      </div>


    </div>
  );
}
