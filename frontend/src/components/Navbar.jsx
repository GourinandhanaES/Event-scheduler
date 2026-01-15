import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showLogin, setShowLogin] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddEventClick = () => {
    if (token) {
      navigate("/admin");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 border-b bg-white sticky top-0 z-40">
        <Link to="/">
          <h1 className="text-xl font-bold">Event Scheduler</h1>
        </Link>

        <div>
          <button
            onClick={handleAddEventClick}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mr-3"
          >
            + Add Event
          </button>

          {token && (
            <button
              onClick={logout}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={() => {
          setShowLogin(false);
          navigate("/admin");
        }}
      />
    </>
  );
};

export default Navbar;
