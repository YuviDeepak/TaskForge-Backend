const prdmod = require('../models/userModel.js')  

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body

    const user = await prdmod.findOne({ email, role })

    if (!user) {
      return res.status(404).send({
        status: false,
        message: "User not found or role mismatch"
      })
    }

    if (user.password !== password) {
      return res.status(400).send({
        status: false,
        message: "Invalid password"
      })
    }

    return res.status(200).send({
      status: true,
      message: "Login successful",
      response: user
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      message: err.message
    })
  }
}