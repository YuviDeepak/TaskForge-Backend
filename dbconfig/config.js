const mongoose=require("mongoose")

let dbconnect =async()=>{
    // await mongoose.connect(`mongodb://127.0.0.1:27017/tasksforge`)
    await mongoose.connect(`mongodb+srv://deepak:deepak1234@cluster0.w3oatvm.mongodb.net/tasksforge`)
}

dbconnect().then(()=>console.log("db connected")
).catch((err)=>console.log("dberr",err));
