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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-3" >
      <h3 className="text-lg font-semibold">{isEdit ? "Edit Event" : "Add Event"}</h3>

      <label className="block text-sm font-medium text-gray-700">
        Event Title
      </label>
      <input name="title" placeholder="Title" className="input w-full border border-gray-400" value={form.title} onChange={handleChange} required />

      {/* <label className="block text-sm font-medium text-gray-700 mb-1">
        Event Date
      </label>
      <input name="date" type="date" className="input w-1/2 border border-gray-400" value={form.date} onChange={handleChange} required/> */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Date
          </label>
          <input name="date" type="date" className="input w-full border border-gray-400" value={form.date} onChange={handleChange} required/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input name="startTime" type="time" className="input w-full border border-gray-400" value={form.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input name="endTime" type="time" className="input w-full border border-gray-400" value={form.endTime} onChange={handleChange} required/>
        </div>
      </div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
      Description (optional)
    </label>
      <textarea name="description" placeholder="Description" className="input w-full border border-gray-400" value={form.description} onChange={handleChange}/>
      <button
        className={`w-full py-2 px-4 rounded text-white ${
          isEdit ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-600 hover:bg-gray-700"
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
