import { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../api/eventApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventForm({ refresh, editEvent }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const isEdit = !!editEvent?._id;

  useEffect(() => {
    if (editEvent) setForm(editEvent);
  }, [editEvent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateEvent(editEvent._id, form);
        toast.success("Event updated successfully!");
      } else {
        await createEvent(form);
        toast.success("Event created successfully!");
      }
      setForm({ title: "", description: "", date: "", startTime: "", endTime: "" });
      refresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-5" >
      <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">{isEdit ? "Edit Event" : "Add Event"}</h3>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Event Title
      </label>
      <input name="title" placeholder="e.g. Team Meeting" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" value={form.title} onChange={handleChange} required />

      {/* <label className="block text-sm font-medium text-gray-700 mb-1">
        Event Date
      </label>
      <input name="date" type="date" className="input w-1/2 border border-gray-400" value={form.date} onChange={handleChange} required/> */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input name="date" type="date" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" value={form.date}  onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
          <input name="startTime" type="time" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" value={form.startTime}  onChange={handleChange}  required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
          <input name="endTime" type="time" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" value={form.endTime} onChange={handleChange}  required />
        </div>
      </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          placeholder="Add details about the event..."
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-24 resize-none"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <button
        className={`w-full py-2.5 px-4 rounded-lg font-bold text-white shadow-lg transition-all active:scale-95 ${  isEdit ? "bg-amber-500 hover:bg-amber-600 shadow-amber-200" : "bg-gray-600 hover:bg-gray-700 shadow-gray-200"
        }`}
      >
        {isEdit ? "Update Event" : "Add Event"}
      </button>
    </form>
    <ToastContainer 
      position="top-center" 
      autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss 
      draggable 
      pauseOnHover 
    />
    </>
  );
}
