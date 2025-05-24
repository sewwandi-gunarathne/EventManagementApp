import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2>Welcome to the Event Booking Applocation</h2>
      <div className="nav-links">
      <Link href ={"/events"}><button className = "button button-navbar">View Events</button></Link>
      <Link href ={"/book"}><button className = "button button-navbar">Book an Event</button></Link>
      <Link href ={"/admin"}><button className = "button button-navbar">Admin</button></Link>
      </div>

    </div>
  );
}
