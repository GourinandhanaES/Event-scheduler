const express = require("express");
const {
  createEvent,
  getEventsByDate,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

const router = express.Router();

router.post("/events", createEvent);
router.get("/events", getEventsByDate);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;
