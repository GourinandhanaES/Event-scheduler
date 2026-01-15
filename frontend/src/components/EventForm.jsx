import { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../api/eventApi";

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
        alert("Event updated successfully");
      } else {
        await createEvent(form);
        alert("Event created successfully");
      }
      setForm({ title: "", description: "", date: "", startTime: "", endTime: "" });
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-lg font-semibold">{isEdit ? "Edit Event" : "Add Event"}</h3>
      <input
        name="title"
        placeholder="Title"
        className="input w-full"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        className="input w-full"
        value={form.date}
        onChange={handleChange}
        required
      />
      <div className="flex gap-2">
        <input
          name="startTime"
          type="time"
          className="input w-1/2"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          name="endTime"
          type="time"
          className="input w-1/2"
          value={form.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        className="input w-full"
        value={form.description}
        onChange={handleChange}
      />
      <button
        className={`w-full py-2 px-4 rounded text-white ${
          isEdit ? "bg-yellow-600 hover:bg-yellow-700" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isEdit ? "Update Event" : "Add Event"}
      </button>
    </form>
  );
}
