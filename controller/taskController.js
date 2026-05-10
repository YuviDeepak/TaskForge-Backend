const mongoose = require("mongoose");
const taskModel = require("../models/taskModel.js");
const groupModel = require("../models/GroupModel.js");

const userModel=require("../models/userModel.js")

exports.createTasks = async (req, res) => {
    try {
        const task = await taskModel.create(req.body);

        return res.status(201).send({
            status: true,
            message: "Task created successfully",
            response: task
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
};

exports.getUserTasks = async (req, res) => {
    try {
        const userId = req.params.userId;

        const createdTasks = await taskModel.find({
            createdBy: userId
        });

        const groups = await groupModel.find({
            members: userId
        });

        const groupIds = groups.map(g => g._id);

        const assignedTasks = await taskModel.find({
            groups: { $in: groupIds }
        });

        return res.status(200).send({
            status: true,
            message: "Tasks fetched",
            response: {
                createdTasks,
                assignedTasks
            }
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
};


exports.updateTaskassignedGroups = async (req, res) => {
    try {
        let taskId = req.params.taskId
        let obj = req.body
        const result = await taskModel.updateOne(
            { _id: taskId },
            {
                $addToSet: {
                    groups: { $each: obj.groups }
                }
            }
        )
        return res.status(200).send({
            status: true,
            message: "updated successfully",

        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: "updated unsuccessfully",

        })
    }
}
exports.updateTaskCompletion = async (req, res) => {
    try {
        let taskId = req.params.taskId
        let userId = req.body.userId

        await taskModel.updateOne(
            { _id: taskId },
            { $addToSet: { completedBy: userId } } 
        )

        await userModel.updateOne({_id:userId},{$inc:{completedTask:1}})

        return res.status(200).send({
            status: true,
            message: "Task completed successfully"
        })
    }
    catch (err) {
        return res.status(400).send({
            status: false,
            message: "Task completion unsuccessful"
        })
    }
}

exports.mostAndLeastTask = async (req, res) => {

    try {

        let userId=req.params.userId

        const tasks = await taskModel.find({createdBy:userId});

        const sortedTasks = tasks.sort((a, b) => {

            return (
                (b.completedBy?.length || 0) -
                (a.completedBy?.length || 0)
            );

        });

        const mostCompletedTask = sortedTasks[0];

        const leastCompletedTask =
            sortedTasks[sortedTasks.length - 1];

        res.status(200).send({

            status: true,

            mostCompletedTask,

            leastCompletedTask

        });

    } catch (err) {

        res.status(500).json({

            status: false,
            message: "Not fetched"

        });

    }
};