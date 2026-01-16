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
    <div className="lg:h-full flex flex-col p-4 lg:p-8 space-y-6 lg:overflow-hidden">
      <header className="flex-shrink-0">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
        <p className="text-gray-500 mt-1">Manage your schedule and upcoming events</p>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:overflow-hidden">
        {/* Calendar Section - Compact & Cute */}
        <div className="lg:w-[500px] flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-50/50 border border-gray-100 p-4 lg:p-6 transition-all hover:shadow-2xl hover:shadow-indigo-100/50">
            <style>{`
              .fc-theme-standard td, .fc-theme-standard th { border: none !important; }
              .fc-col-header-cell-cushion { padding-bottom: 15px !important; color: #9ca3af !important; font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
              .fc-daygrid-day-number { color: #374151; font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
              .fc-button-primary { background-color: transparent !important; border: none !important; color: #4f46e5 !important; font-weight: 700 !important; text-transform: capitalize !important; }
              .fc-button-primary:hover { background-color: #f5f3ff !important; color: #4338ca !important; }
              .fc-button-primary:disabled { background-color: transparent !important; color: #d1d5db !important; }
              .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 800 !important; color: #1f2937 !important; }
              .fc-daygrid-day-top { flex-direction: column !important; align-items: center !important; }
              .fc-day-today { background-color: #f5f3ff !important; border-radius: 12px; }
              .fc-scrollgrid { border: none !important; }
              .fc-daygrid-body { border: none !important; }
              .fc-daygrid-day { transition: all 0.2s; }
              .fc-daygrid-day:hover { background-color: #f9fafb; border-radius: 12px; }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height={isMobile ? 300 : "auto"}
              contentHeight={isMobile ? 300 : "auto"}
              fixedWeekCount={false}
              headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
              }}
              dateClick={(info) => setSelectedDate(info.dateStr)}
              dayCellClassNames={(arg) => {
                const classes = ["cursor-pointer", "transition-all"];
                if (arg.dateStr === selectedDate) classes.push("!bg-indigo-600 !text-white rounded-xl shadow-lg shadow-indigo-200");
                return classes.join(" ");
              }}
              dayCellContent={(arg) => (
                <div className="relative flex flex-col items-center py-2">
                  <span className={`text-sm ${arg.dateStr === selectedDate ? "text-white" : "text-gray-700"}`}>
                    {arg.dayNumberText}
                  </span>
                  {hasEvents(arg.dateStr) && (
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full ${arg.dateStr === selectedDate ? "bg-white" : "bg-indigo-500"}`}></div>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-6 bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Upcoming Focus</p>
                <p className="text-xs text-gray-500">Pick a date to stay organized</p>
              </div>
            </div>
          </div>
        </div>

        {/* Event List Section */}
        <div className="flex-1 flex flex-col min-h-0 bg-white lg:bg-transparent rounded-3xl lg:rounded-none">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-shrink-0 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
                    : "Your Schedule"
                  }
                </h3>
                <p className="text-gray-500 font-medium">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }) : "Select a date to view details"}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-4">
              {selectedDate ? (
                <EventList events={events} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">No date selected</h4>
                  <p className="text-gray-400 max-w-[200px] mx-auto">Click on any date in the calendar to see events.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
