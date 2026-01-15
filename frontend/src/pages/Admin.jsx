import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import { getEventsByDate } from "../api/eventApi";
import AdminEventCard from "../components/AdminEventCard";

export default function Admin() {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async (date = "") => {
    try {
      const res = await getEventsByDate(date);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents(selectedDate);
  }, [refreshFlag, selectedDate]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Create/Edit Event Form */}
      <EventForm refresh={() => setRefreshFlag(!refreshFlag)} />

      {/* Optional: Filter by date */}
      <div className="flex items-center space-x-3 mt-6">
        <label className="font-semibold">Filter by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input"
        />
        {selectedDate && (
          <button
            className="text-sm text-gray-700 underline"
            onClick={() => setSelectedDate("")}
          >
            Clear
          </button>
        )}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {events.length > 0 ? (
          events.map(event => (
            <AdminEventCard
              key={event._id}
              event={event}
              isEditing={editingId === event._id}
              onEdit={() => setEditingId(event._id)}
              onCancelEdit={() => setEditingId(null)}
              refresh={() => setRefreshFlag(!refreshFlag)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No events found</p>
        )}
      </div>
    </div>
  );
}
