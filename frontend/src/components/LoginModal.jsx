import { useState } from "react";
import { loginAdmin } from "../api/authApi";

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(form);
      localStorage.setItem("token", res.data.token);
      onSuccess();   // close modal + redirect
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input w-full mb-3"
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input w-full mb-4"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button className=" btn w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
