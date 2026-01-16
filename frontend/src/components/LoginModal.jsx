import { useState } from "react";
import { loginAdmin } from "../api/authApi";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAdmin(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      toast.success(`Welcome back, ${res.data.username}!`);
      onSuccess();   // close modal + redirect
    } catch(error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm relative transform transition-all scale-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>

           <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg active:scale-95 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
