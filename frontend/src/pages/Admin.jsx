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
    <div className="h-full flex flex-col p-4 lg:p-8 space-y-6">
      <header className="flex-shrink-0">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">Create and manage your events efficiently.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Left Column: Create Form */}
        <div className="lg:col-span-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
          <EventForm refresh={() => setRefreshFlag(!refreshFlag)} />
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <div className="flex-shrink-0 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filter by Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            {selectedDate && (
              <button
                className="text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                onClick={() => setSelectedDate("")}
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
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
                <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed">
                  <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm font-medium">No events found for this filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
