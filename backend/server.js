const express =  require("express")
const app = express()
const route = require('./Routes/UssdRoute')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/",route)
app.listen(9010,()=>{
    console.log("Server Live And Listening")


})