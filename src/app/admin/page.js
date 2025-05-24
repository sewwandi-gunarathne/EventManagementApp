import Link from "next/link";
export default function AdminPage() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Bookings would be listed here</p>
      <br/>
      <Link href ="/">
      <button className="button-link">Back to Home</button>
      </Link>
    </div>
  );
}
