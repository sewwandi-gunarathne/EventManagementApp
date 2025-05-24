import Link from "next/link";
export default function EventDetail({ params }) {
  const { id } = params;

  return (
    <div>
      <h2>Event Details (ID: {id})</h2>
      <p>Details for event {id}...</p>
      <Link href ="/book">
      <button type="button-link">Book this Event</button>
      </Link>
       <Link href ="/">
      <button type="button-link">Back to Home</button>
      </Link>
      
    </div>
  );
}
