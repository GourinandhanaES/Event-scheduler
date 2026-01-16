import EventForm from "./EventForm";
import { deleteEvent } from "../api/eventApi";
import { toast } from "react-toastify";

export default function AdminEventCard({ event, isEditing, onEdit, onCancelEdit, refresh }) {
 const handleDelete = () => {
    confirmDelete();
  };
  const confirmDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold mb-2">
            Are you sure you want to delete this event?
          </p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={async () => {
                try {
                  await deleteEvent(event._id);
                  toast.success("Event deleted successfully");
                  refresh();
                } catch {
                  toast.error("Failed to delete event");
                }
                closeToast();
              }}
            >
              Delete
            </button>

            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };



  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {isEditing ? (
        <EventForm
          editEvent={event}
          refresh={() => { onCancelEdit(); refresh(); }}
        />
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
            <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              {event.date}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3 text-sm text-indigo-600 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {event.startTime} – {event.endTime}
          </div>

          {event.description && (
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">
              {event.description}
            </p>
          )}

          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-50 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100 uppercase">
              {event.createdBy?.substring(0, 2) || "U"}
            </div>
            <span className="text-xs text-gray-400">
              Created by <span className="font-semibold text-gray-600">{event.createdBy || "Admin"}</span>
            </span>
          </div>

          <div className="flex gap-3 pt-3 border-t border-gray-50">
            <button
              onClick={onEdit}
              className="flex-1 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
