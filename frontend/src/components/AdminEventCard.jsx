import EventForm from "./EventForm";
import { deleteEvent } from "../api/eventApi";

export default function AdminEventCard({ event, isEditing, onEdit, onCancelEdit, refresh }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(event._id);
      refresh();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {isEditing ? (
        <EventForm
          editEvent={event}
          refresh={() => { onCancelEdit(); refresh(); }}
        />
      ) : (
        <>
          <h4 className="font-semibold text-lg">{event.title}</h4>
          <p className="text-sm text-gray-600">
            {event.date} • {event.startTime} – {event.endTime}
          </p>
          {event.description && <p className="text-gray-700 mt-1">{event.description}</p>}
          <div className="flex gap-2 mt-3">
            <button
              onClick={onEdit}
              className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
