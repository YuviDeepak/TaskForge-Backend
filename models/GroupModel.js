const mongoose = require("mongoose")
const userModel = require("./userModel")
const groupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            unique: true,
            required: [true, "Group name can not be empty"]
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: [true, "Admin can't be empty"],

        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ]

    }, { timestamps: true }
)

module.exports = mongoose.model("Group", groupSchema)