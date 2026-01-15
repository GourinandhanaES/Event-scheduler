const express = require("express");
const {
  createEvent,
  getEventsByDate,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Public
router.get("/", getEventsByDate);

// Admin protected
router.post("/", authMiddleware, createEvent);
router.put("/:id", authMiddleware, updateEvent);
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;
