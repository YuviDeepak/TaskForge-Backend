const express = require("express")
const app = express()
const port = 7000

const dns=require("dns")
dns.setServers(["1.1.1.1","8.8.8.8"])

const cors = require("cors")  
const mainrouter = require('./router/mainrouter.js')
const db = require('./dbconfig/config.js')

app.use(cors())                
app.use(express.json())

app.use("/", mainrouter)

app.listen(port, () => {
    console.log(`server => http://localhost:${port}`)
})