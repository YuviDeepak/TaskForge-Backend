const userModel = require('../models/userModel.js')
const prdmod = require('../models/userModel.js')

exports.getUser = async (req, res) => {
  try {
    let id = req.params.userId   

    const user = await prdmod.findById(id)  

    if (user) {
      return res.status(200).send({
        status: true,
        message: "User found",
        response: user
      })
    } else {
      return res.status(404).send({
        status: false,
        message: "User not found"
      })
    }

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}

exports.createUser = async (req, res) => {
  try {
    let info = req.body
    console.log("Body =>", info)

    let result

    if (!Array.isArray(info)) {

      const existingUser = await prdmod.findOne({ email: info.email })

      if (existingUser) {
        return res.status(400).send({
          status: false,
          message: "User already exists"
        })
      }

      result = await prdmod.create(info)
    }

    else {
      result = await prdmod.insertMany(info)
    }

    return res.status(201).send({
      status: true,
      message: "User registered successfully",
      response: result
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.userId
    let uptData = req.body

    const result = await prdmod.updateOne(
      { _id: id },
      { $set: uptData }
    )

    if (result.matchedCount === 0) {   
      return res.status(404).send({
        status: false,
        message: "User not found"
      })
    }

    return res.status(200).send({
      status: true,
      message: "User updated successfully"
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.userId

    const result = await prdmod.deleteOne({ _id: id })

    if (result.deletedCount === 0) {   
      return res.status(404).send({
        status: false,
        message: "User not found"
      })
    }

    return res.status(200).send({
      status: true,
      message: "User deleted successfully"
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}

exports.getUserLeaderBoard=async(req,res)=>{
  try{
    let leader=await userModel.find().sort({completedTask:-1})
    return res.status(200).send({
      status:true,
      message:"fetched successfully",
      response:leader
    })
  }
  catch(err){
    return  res.status(400).send({
      status:false,
      message:err.message
    }) 
  }
}