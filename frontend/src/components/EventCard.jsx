export default function EventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border-l-4 border-indigo-500">
      <p className="text-indigo-600 font-semibold">
        {event.startTime} - {event.endTime}
      </p>
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-gray-600">{event.description}</p>
    </div>
  );
}
