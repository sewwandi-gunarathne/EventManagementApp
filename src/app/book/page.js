import BookContainer from "./BookContainer"

export const revalidate = 60;

export default async function BookingsPage() {
  const res = await fetch ('http://localhost:3000/api/bookings', {
    next: { revalidate:60 },
  });

  const bookings = await res.json();
  return <BookContainer initialEvents ={bookings}/> 
}