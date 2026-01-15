import { useEffect, useState } from "react";
import { getEventsByDate } from "../api/eventApi";
import EventList from "../components/EventList";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Events() {
  const today = new Date().toLocaleDateString("en-CA"); 
  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); 

  const fetchEvents = async (date) => {
    if (!date) return;
    const res = await getEventsByDate(date);
    setEvents(res.data);
  };

  const fetchAllEvents = async () => {
    try {
      const res = await getEventsByDate("");
      setAllEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  useEffect(() => {
    if (selectedDate) fetchEvents(selectedDate);
  }, [selectedDate]);

  const isMobile = window.innerWidth < 640;

  const hasEvents = (dateStr) => {
    return allEvents.some((event) => event.date === dateStr);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Column */}
        <div className="bg-white rounded-lg shadow p-4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              left: isMobile ? "prev,next" : "prev,next today",
              center: "title",
              right: "",
            }}
            dateClick={(info) => setSelectedDate(info.dateStr)}
            dayCellClassNames={(arg) => {
              const classes = ["cursor-pointer", "hover:bg-gray-100", "rounded"];
              if (arg.dateStr === selectedDate) classes.push("bg-blue-100");
              if (hasEvents(arg.dateStr)) classes.push("border-b-4", "border-blue-500"); // mark days with events
              return classes.join(" ");
            }}
          />
        </div>

        {/* Event List Column */}
        <div>
          {selectedDate ? (
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Events on {selectedDate}
              </h3>
              <EventList events={events} />
            </div>
          ) : (
            <p className="text-gray-500">
              Select a date from the calendar to see events.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
