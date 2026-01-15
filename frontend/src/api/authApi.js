import axios from "axios";

const API = "https://event-scheduler-backend-pz6e.onrender.com/api/auth";

export const loginAdmin = async (data) => {
  return axios.post(`${API}/login`, data);
};
