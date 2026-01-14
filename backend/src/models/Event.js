const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim:true
        },
        description:{
            type: String,
        },
        date:{
            type: String,
            required:true
        },
        startTime:{
            type: String,
            required:true
        },
        endTime:{
            type: String,
            required:true
        },
        createdBy:{
            type: String,
            required:true
        }
    },
    {timestamps:true}
);
module.exports = mongoose.model("Event", eventSchema);