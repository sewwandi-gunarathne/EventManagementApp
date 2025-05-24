
export default function BookPage() {
async function handleBooking(formData) {
'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  console.log('Booking:', { name, email });
}


  return (
    <div className="form-container">
      <h2>Book an Event</h2>
      <form action={handleBooking}>
        <div className="form-group">
        <label>
          Name: <input type="text" name="name" required />
        </label>
        </div>
        <div className="form-group">
        <label>
          Email: <input type="email" name="email" required />
        </label>
        </div>
        <button type="submit">Submit Booking</button>
        
      </form>
    </div>
  );
}