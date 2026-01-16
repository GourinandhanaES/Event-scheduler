import { NavLink,Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showLogin, setShowLogin] = useState(false);
  

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully", "info")
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
      <nav className="w-full lg:w-64 lg:h-screen lg:sticky top-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-row lg:flex-col z-40">
        <div className="p-4 lg:p-6 flex items-center justify-between lg:block w-full lg:w-auto">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
              E
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              Evently
            </h1>
          </Link>

          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={handleAddEventClick}
              className="p-2 text-indigo-600 bg-indigo-50 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            {token && (
              <button
                onClick={logout}
                className="p-2 text-red-600 bg-red-50 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-1 px-4 space-y-2 py-4 flex-col">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Events
          </Link>

          {token && (
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </Link>
          )}
        </div>

        <div className="hidden lg:block p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={handleAddEventClick}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-200 font-bold mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Event
          </button>

          {token ? (
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-all font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login as Admin
            </button>
          )}
        </div>
      </nav>

      <div className="lg:hidden flex fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 justify-around z-40">
        <NavLink to="/" className={({ isActive }) => `p-3 ${isActive ? "text-indigo-600" : "text-gray-600"}`} >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </NavLink>
        {token && (
          <NavLink  to="/admin" className={({ isActive }) => `p-3 ${isActive ? "text-indigo-600" : "text-gray-600"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </NavLink>
        )}
      </div>

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
