import { useEffect, useState } from "react";
import { getEventsByDate } from "../api/eventApi";
import EventList from "../components/EventList";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Events() {
  const [selectedDate, setSelectedDate] = useState("");
  const [events, setEvents] = useState([]);

  const fetchEvents = async (date) => {
    if (!date) return;
    const res = await getEventsByDate(date);
    setEvents(res.data);
  };

  useEffect(() => {
    if (selectedDate) fetchEvents(selectedDate);
  }, [selectedDate]);

  const today = new Date().toISOString().split("T")[0];

const upcomingEvents = events
  .filter(event => event.date >= today)
  .sort((a, b) => {
    if (a.date === b.date) {
      return a.startTime.localeCompare(b.startTime);
    }
    return a.date.localeCompare(b.date);
  });


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

      {/* Upcoming Events List */}
      {upcomingEvents.length > 0 ? (
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <ul className="space-y-3">
            {upcomingEvents.map(event => (
              <li
                key={event._id}
                className="border-l-4 border-blue-500 pl-4"
              >
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-gray-600">
                  {event.date} • {event.startTime} – {event.endTime}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">No upcoming events</p>
      )}

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          dateClick={(info) => {
            setSelectedDate(info.dateStr);
          }}
          dayCellClassNames={(arg) =>
            arg.dateStr === selectedDate
              ? "bg-blue-100 rounded"
              : "cursor-pointer hover:bg-gray-100"
          }
        />
      </div>

      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Events on {selectedDate}
          </h3>
          <EventList events={events} />
        </div>
      )}
    </div>
  );
}
