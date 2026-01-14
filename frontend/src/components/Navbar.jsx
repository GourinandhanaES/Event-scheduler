import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h3>Event Scheduler</h3>
      <div>
        <Link to="/">Events</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
