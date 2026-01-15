import axios from "axios";

const API = "https://event-scheduler-backend-pz6e.onrender.com/api/events";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getEventsByDate = (date) =>
  axios.get(`${API}?date=${date}`);

export const createEvent = (data) =>
  axios.post(API, data, authHeader());

export const updateEvent = (id, data) =>
  axios.put(`${API}/${id}`, data, authHeader());

export const deleteEvent = (id) =>
  axios.delete(`${API}/${id}`, authHeader());
