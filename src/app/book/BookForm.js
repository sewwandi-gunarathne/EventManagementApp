"use client";

import Link from "next/link";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export default function BookForm({
  formData,
  onChange,
  onSubmit,
  isPending,
  popupMessage,
  showPopup,
  closePopup
}) {
  return (
    <div className="form-container">
      <h2>Book an Event</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Event ID:
            <input
              type="text"
              name="eventId"
              value={formData.eventId}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <button type="submit" className="button-link" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Booking"}
        </button>
      </form>

      <Link href="/">
        <button className="button-link">Back to Home</button>
      </Link>

      <Popup open={showPopup} closeOnDocumentClick onClose={closePopup}>
        <div className="modal">
          <a className="close" onClick={closePopup}>&times;</a>
          <div className="content">{popupMessage}</div>
          <div className="actions">
            <button className="button button-ok" onClick={closePopup}>OK</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
