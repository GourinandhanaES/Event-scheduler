import { useEffect, useState } from "react";
import { getEventsByDate } from "../api/eventApi";
import EventList from "../components/EventList";
import EventCalendar from "../components/EventCalendar";

export default function Events() {
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    if (!date) return;
    const res = await getEventsByDate(date);
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, [date]);

  return (
    <div className="page-container">
      <h2>Scheduled Events</h2>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <EventCalendar events={events} />
      <EventList events={events} />
    </div>
  );
}
