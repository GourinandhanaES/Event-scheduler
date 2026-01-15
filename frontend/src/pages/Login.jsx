import { useState } from "react";
import { loginAdmin } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="input"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="input mt-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn mt-4 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
