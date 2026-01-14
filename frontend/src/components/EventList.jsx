import EventCard from "./EventCard";

export default function EventList({ events }) {
  if (!events.length) return <p>No events scheduled</p>;

  return events.map(event => (
    <EventCard key={event._id} event={event} />
  ));
}
