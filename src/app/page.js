'use client';

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const isLoggedIn = !!session

  return (
    <div>
      <center><h2>Welcome to the Event Booking Application</h2></center>

      <div className="nav-links">
        <Link href="/events"><button className="button-navbar" disabled={!isLoggedIn}>View Events</button></Link>
        <Link href="/book"><button className="button-navbar" disabled={!isLoggedIn}>Book an Event</button></Link>
        <Link href="/admin"><button className="button-navbar" disabled={!isLoggedIn}>Admin</button></Link>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {isLoading && <p>Checking login status...</p>}

        {session ? (
          <>
            <p>Logged in as <strong>{session.user.name}</strong></p>
            <button className="button-login" onClick={() => signOut({ callbackUrl: '/' })}>
              Logout
            </button>
          </>
        ) : (
          <button className="button-login" onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}
