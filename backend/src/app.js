const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", eventRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
