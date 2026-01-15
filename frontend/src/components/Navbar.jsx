import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-50">
      <Link to='/'><h1 className="text-xl font-bold">Event Scheduler</h1></Link>
      {token ? (
        <div>
          <Link to="/admin" className="mr-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Add Event
            </button>
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Add Event
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
