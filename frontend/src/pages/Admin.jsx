import { useEffect, useState } from "react";
import { getEventsByDate } from "../api/eventApi";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

export default function Admin() {
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    if (!date) return;
    const res = await getEventsByDate(date);
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, [date]);

  return (
    <>
      <h2>Admin Dashboard</h2>

      <input type="date" onChange={e => setDate(e.target.value)} />

      <EventForm refresh={loadEvents} />
      <EventList events={events} />
    </>
  );
}
