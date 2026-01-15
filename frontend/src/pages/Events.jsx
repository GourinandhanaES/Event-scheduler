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
  return events.some(
    (event) =>
      new Date(event.date).toISOString().split("T")[0] === dateStr
  );
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
            dayCellContent={(arg) => {
              const hasEvent = hasEvents(arg.dateStr);
              const isSelected = arg.dateStr === selectedDate;

              return (
                <div className="flex flex-col items-center justify-center h-full">
                  <span
                    className={`text-sm ${
                      isSelected ? "font-bold text-blue-700" : ""
                    }`}
                  >
                    {arg.dayNumberText}
                  </span>

                  {hasEvent && (
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1"></span>
                  )}
                </div>
              );
            }}
            dayCellClassNames={(arg) =>
              arg.dateStr === selectedDate
                ? "bg-blue-100 rounded cursor-pointer"
                : "cursor-pointer hover:bg-gray-100"
            }
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
