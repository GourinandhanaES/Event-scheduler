import EventCard from "./EventCard";

export default function EventList({ events }) {
  if (!events.length) {
    return <p className="text-gray-500">No events scheduled</p>;
  }

  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
