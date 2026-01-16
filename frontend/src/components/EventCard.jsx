export default function EventCard({ event }) {
  return (
    <div className="bg-white group rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
      <div
        className="absolute left-0 top-0 w-1.5 h-full bg-indigo-600"
      />

      <div className="flex items-center gap-2 mb-3 font-bold text-xs uppercase tracking-wider text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span>{event.startTime} - {event.endTime}</span>
      </div>

      <h3 className="text-gray-900 font-bold text-lg mb-2 transition-colors">{event.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

      <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase">
          {event.createdBy?.substring(0, 2) || "U"}
        </div>
        <span className="text-xs text-gray-400 font-medium">
          Created by <span className="text-gray-600">{event.createdBy || "Anonymous"}</span>
        </span>
      </div>
    </div>
  );
}
