// const grpmod = require("../models/GroupModel.js");
const { response } = require("express");
const grpmod = require("../models/GroupModel.js")
const taskmod=require('../models/taskModel.js');
const userModel = require("../models/userModel.js");

exports.getGroup = async (req, res) => {
    try {
        let id = req.params.groupId;

        const groupModel = await grpmod.findById(id);

        if (groupModel) {
            return res.status(200).send({
                status: true,
                message: "Group found",
                response: groupModel
            });
        } else {
            return res.status(404).send({
                status: false,
                message: "Group not found"
            });
        }

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
};


exports.createGroup = async (req, res) => {
    try {
        let info = req.body;

        let result;


        const gpName = info.groupName;

        const existingGroup = await grpmod.find({ groupName: gpName });

      

        result = await grpmod.create(info);
        

        return res.status(201).send({
            status: true,
            message: "Group created successfully",
            response: result
        });

    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        });
    }
}

exports.updateGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        let uptData = req.body
        const result = await grpmod.updateOne({ _id: id }, { $set: uptData })
        if (result.matchedCount === 0) {
            return res.status(404).send({
                status: false,
                message: "Group not found"
            })
        }

        return res.status(200).send({
            status: true,
            message: "Group updated successfully"
        })
    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.deleteGroup = async (req, res) => {
    try {
        let id = req.params.groupId
        const result = await grpmod.deleteOne({ _id: id })
        if (result.deletedCount == 0) {
            return res.status(400).send({
                status: false,
                message: "Group not found",
            })
        }
        return res.status(400).send({
            status: true,
            message: "Group deleted successfully",
        })

    }
    catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

exports.joinGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId
        const { userId } = req.body

        const group = await grpmod.findById(groupId)

        if (!group) {
            return res.status(404).send({ message: "Group not found" })
        }

        if (group.members.includes(userId)) {
            return res.status(400).send({ message: "Already joined" })
        }

        group.members.push(userId)
        await group.save()

        res.status(200).send({ message: "Joined successfully" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

exports.getUserGroups = async (req, res) => {
  try {
    const userId = req.params.userId

    const createdGroups = await grpmod.find({
      createdBy: userId
    })

    const joinedGroups = await grpmod.find({
      members: userId
    })

    return res.status(200).send({
      status: true,
      message: "Groups fetched",
      response: {
        createdGroups,
        joinedGroups
      }
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}

exports.groupPop = async (req, res) => {
  try {
    let groupId = req.params.groupId;

    const group = await grpmod
      .findById(groupId)
      .populate({
        path: "members",
        select: "name"
      });

    if (!group) {
      return res.status(404).send({
        status: false,
        message: "Group not found"
      });
    }

    const tasks = await taskmod.find({
      groups: groupId
    });

    return res.status(200).send({
      status: true,
      message: "Group data fetched",
      response: {
        group,
        tasks
      }
    });

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    });
  }
};

exports.groupUsersOnly = async (req, res) => {
  try {
    let userId = req.params.userId;

    const result = await grpmod
      .find({ createdBy: userId }, { members: 1, _id: 0 })
      .populate({
        path: "members",
        select: "name"
      });

    let allMembers = result.flatMap(group => group.members);

    let uniqueMembers = [
      ...new Map(allMembers.map(m => [m._id.toString(), m])).values()
    ];

    return res.status(200).send({
      status: true,
      message: "Users fetched",
      response: uniqueMembers
    });

  } catch (err) {
    return res.status(400).send({
      status: false,
      message: "Users not fetched",
    });
  }
};