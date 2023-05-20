const express=require("express")
const app=express()
app.use(express.json())

app.use('/test',(req,res)=>{
  res.send("Vanakkam Makkaley 💞\n Fianlly It worked 🥺")
})

//Route for Users
const userRoute = require('./routes/users.js')
app.use('/users',userRoute)



  //Starting Server
  const port=4000
  app.listen(port, ()=>{
    console.log("Server is Running on Port",port)
  })