const express=require("express")
const app=express()

app.use(express.json())
//Route for Users
const userRoute = require('./routes/users.js')
app.use('/users',userRoute)



  //Starting Server
  const port=4202
  app.listen(port, ()=>{
    console.log("Server is Running on Port",port)
  })