const express=require("express")
const {getAlarms,addAlarm} = require("../database.js")
const router= express.Router()

//JWT AND SECRET 
const jwt=require("jsonwebtoken")
var SECRET=require('crypto').randomBytes(64).toString('hex')
var expiresIn="1hr"

//GET ALARMS
router.get("/:id",authenticateToken,async (req, res)=>{
    try{
    const alarms= await getAlarms(req.params.id)
    res.json({alarms:alarms})
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