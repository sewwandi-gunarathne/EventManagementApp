import fs from 'fs';
import path from 'path';
import Link from 'next/link';


export default async function EventDetail({ params = {}}) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), 'src/app/data/events.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const events = JSON.parse(fileData);

  const event = events.find(e => e.id.toString() === id);

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
        <button className="button-link">Book this Event</button>
      </Link>
      <Link href="/">
        <button className="button-link">Back to Home</button>
      </Link>
    </div>
  );
}



export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'src/app/data/events.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const events = JSON.parse(fileData);
  

  return events.map(event => ({
    id: event.id.toString()
  }));
}
