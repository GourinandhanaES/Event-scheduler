import { useState } from "react";
import { createEvent } from "../api/eventApi";

export default function EventForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createEvent(form);
      alert("Event created successfully");
      refresh();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="input"/>
      <input name="date" type="date" onChange={handleChange} className="input"/>
      <input name="startTime" type="time" onChange={handleChange} className="input"/>
      <input name="endTime" type="time" onChange={handleChange} className="input"/>
      <textarea name="description" placeholder="Description" onChange={handleChange} className="input"/>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">
        Add Event
      </button>
    </form>
  );
}
