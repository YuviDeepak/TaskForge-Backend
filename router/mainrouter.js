const express = require('express')
const router = express.Router()

// const {getTasks,createTasks,updateTasks,deleteTasks,getUserTasks}=require('../controller/taskController.js')
const { getUser, createUser, updateUser, deleteUser,getUserLeaderBoard } = require('../controller/userController.js')
const { getGroup, createGroup, updateGroup, deleteGroup, joinGroup, getUserGroups,groupPop,groupUsersOnly } = require('../controller/groupController.js')

const { loginUser } = require('../controller/loginController.js')

//tasks

const { createTasks, getUserTasks,updateTaskassignedGroups,updateTaskCompletion,mostAndLeastTask } = require('../controller/taskController.js')

router.post("/tasks", createTasks)
router.get("/tasks/user/:userId", getUserTasks)
router.put("/tasks/:taskId",updateTaskassignedGroups)
router.put("/tasks/usercompletion/:taskId",updateTaskCompletion)
router.get("/tasks/task/userId",mostAndLeastTask)


// router.post("/task", createTasks)                    
// router.get("/task/:taskId", getTasks)                
// router.get("/tasks/user/:userId", getUserTasks)      
// router.put("/task/:taskId", updateTasks)
// router.delete("/task/:taskId", deleteTasks)

router.post("/users", createUser)
router.get("/users/leader", getUserLeaderBoard)
router.get("/users/:userId", getUser)
router.put("/users/:userId", updateUser)
router.delete("/users/:userId", deleteUser)

router.post("/login", loginUser)

router.post("/group", createGroup)
router.get("/group/:groupId", getGroup)
router.put("/group/:groupId", updateGroup)
router.delete("/group/:groupId", deleteGroup)
router.put("/group/join/:groupId", joinGroup)
router.get("/group/user/:userId", getUserGroups)
router.get("/group/eachGroup/:groupId",groupPop)
router.get("/group/allusers/:userId",groupUsersOnly)

module.exports = router