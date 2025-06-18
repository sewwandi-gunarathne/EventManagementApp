
'use client';

import Link from "next/link";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export default function CreateEventForm({
  formData,
  error,
  isPending,
  mutationPending,
  handleChange,
  handleImageChange,
  handleSubmit,
  fileInputRef,
  showPopup,
  popupMessage,
  setShowPopup,
}) {
  return (
    <div className="form-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>
            Event Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-group">
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-group">
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-group">
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-group">
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-group">
          <label>
            Image:
            <input type="file" name="image" onChange={handleImageChange} accept="image/*" ref={fileInputRef} />
          </label>
        </div>

        <button type="submit" className="button-link" disabled={isPending || mutationPending}>
          {isPending || mutationPending ? "Creating..." : "Create Event"}
        </button>
      </form>

      <Link href="/admin">
        <button className="button-link">Back to Admin</button>
      </Link>

      <Popup open={showPopup} closeOnDocumentClick onClose={() => setShowPopup(false)}>
        <div className="modal">
          <a className="close" onClick={() => setShowPopup(false)}>&times;</a>
          <div className="content">{popupMessage}</div>
          <div className="actions">
            <button className="button button-ok" onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
