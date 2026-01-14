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
    <form onSubmit={submit} className="event-form">
      <input placeholder="Title" onChange={e=>setForm({...form,title:e.target.value})} />
      <input type="date" onChange={e=>setForm({...form,date:e.target.value})} />
      <input type="time" onChange={e=>setForm({...form,startTime:e.target.value})} />
      <input type="time" onChange={e=>setForm({...form,endTime:e.target.value})} />
      <textarea placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})} />
      <button>Add Event</button>
    </form>
  );
}
