const mongoose=require("mongoose")

let dbconnect =async()=>{
    await mongoose.connect(`mongodb://127.0.0.1:27017/tasksforge`)
}

dbconnect().then(()=>console.log("db connected")
).catch((err)=>console.log("dberr",err));
