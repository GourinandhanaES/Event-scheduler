const Event = require("../models/Event");
const isOverlapping = require("../utils/timeOverlap");

// CREATE EVENT
exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, startTime, endTime } = req.body;

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "End time must be greater than start time"
      });
    }

    const existingEvents = await Event.find({ date });

    for (let event of existingEvents) {
      if (isOverlapping(startTime, endTime, event.startTime, event.endTime)) {
        return res.status(400).json({
          message: "Event overlaps with an existing event"
        });
      }
    }

    const newEvent = await Event.create({
      title,
      description,
      date,
      startTime,
      endTime,
      createdBy: "admin"
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

// GET EVENTS BY DATE
exports.getEventsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    const events = await Event.find({ date }).sort({ startTime: 1 });

    res.json(events);
  } catch (error) {
    next(error);
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, date, startTime, endTime } = req.body;

    const existingEvents = await Event.find({
      date,
      _id: { $ne: id }
    });

    for (let event of existingEvents) {
      if (isOverlapping(startTime, endTime, event.startTime, event.endTime)) {
        return res.status(400).json({
          message: "Updated event overlaps with another event"
        });
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, startTime, endTime },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
};
