import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function EventCalendar({ events }) {
  const calendarEvents = events.map(event => ({
    title: event.title,
    date: event.date
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
      />
    </div>
  );
}
