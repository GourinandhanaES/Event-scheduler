import { useState } from "react";
import EventForm from "../components/EventForm";

export default function Admin() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <EventForm refresh={() => setRefreshFlag(!refreshFlag)} />
    </div>
  );
}
