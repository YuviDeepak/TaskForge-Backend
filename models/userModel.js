const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name cannot be empty"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email can't be empty"],
      unique: true, 
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Enter a valid email"]
    },

    mobile: {
      type: String,
      required: [true, "Mobile number can't be empty"],
      match: [/^[0-9]{10}$/, "Enter valid 10-digit mobile number"]
    },

    password: {
      type: String,
      required: [true, "Password can't be empty"],
      minlength: [6, "Password must be at least 6 characters"]
    },

    completedTask:{
      type:Number
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    }


  
    
    
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)