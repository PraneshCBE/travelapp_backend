const express=require("express")
const {getAlarms,addAlarm} = require("../database.js")
require('dotenv').config()
const router= express.Router()

//JWT AND SECRET 
const jwt=require("jsonwebtoken")
var SECRET=process.env.SECRET

//GET ALARMS
router.get("/",authenticateToken,async (req, res)=>{
    try{
    const alarms= await getAlarms(req.user.id)
    res.json({alarms:alarms})
    console.log("Alarms Info invoked by user id: "+req.user.id+" at "+new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}))
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke 💔",message:"Text Pranesh for more info 😎"})
    }
})

router.post("/set",authenticateToken,async (req, res)=>{
    try{
    const alarms= await addAlarm(req.user.id,req.body.location,req.body.alarm_time)
    if (alarms.affectedRows==1)
    {
        res.json({message:"Alarm Set Successfully 🥳"})
    }
    else
    {
        res.status(500).send({error:"Something Broke 💔",message:"Text Pranesh for more info 😎"})
    }
    console.log("Alarm Set invoked by user id: "+req.user.id+" at "+new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"}))
    console.log(alarms)
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke 💔",message:"Text Pranesh for more info 😎"})
    }
})

//Middleware for Authentication
function authenticateToken(req,res,next){
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if (token==null) return res.status(401).send({error:"Unauthorized Access 🚷",message:"Access Token Not Found",hint:"Please Login to get Access Token"})
   jwt.verify(token,SECRET,(err,user)=>{
       if (err) return res.status(403).send({error:"Forbidden 🏳️",message:"Invalid Access Token or Token Expired",hint:"Please Login to get Access Token",expiresIn:expiresIn})
       req.user=user
       next()
   })
}

module.exports=router