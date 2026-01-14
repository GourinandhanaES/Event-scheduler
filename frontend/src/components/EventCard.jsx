export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="time">
        {event.startTime} – {event.endTime}
      </div>
      <div>
        <h4>{event.title}</h4>
        <p>{event.description}</p>
      </div>
    </div>
  );
}
