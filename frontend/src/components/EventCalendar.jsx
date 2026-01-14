import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function EventCalendar({ events }) {
  const calendarEvents = events.map(e => ({
    title: e.title,
    start: `${e.date}T${e.startTime}`,
    end: `${e.date}T${e.endTime}`
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridDay"
      events={calendarEvents}
      height="auto"
    />
  );
}
