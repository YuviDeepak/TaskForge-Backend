const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDescription: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    groups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ],
    completedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model("Task", taskSchema)