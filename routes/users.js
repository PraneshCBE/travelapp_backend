const express=require("express")
const {getUsers,findUser} = require("../database.js")
const router= express.Router()
//JWT AND SECRET
const jwt=require("jsonwebtoken")
var SECRET=require('crypto').randomBytes(64).toString('hex')
var expiresIn="30s"


//GET USER Details
router.get("/profile",authenticateToken,async (req, res)=>{
    try{
    const users= await getUsers()
    res.json({profile:(users.filter(user=>user.id==req.user.id)),bonus:"💞\nAccess the profile details by (result.profile)[0]"})
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke 💔",message:"Text Pranesh for more info 😎"})
    }
})

//User Login
router.post("/login",async (req, res)=>{
    console.log(SECRET)
    try{
        const user= await findUser(req.body.username,req.body.password)
        if (!user)
        {
            res.status(404).send({error:"User Not Found or Invalid Credentials 🚷"})
        }
        else
        {
            const token=jwt.sign(user,SECRET,{expiresIn:expiresIn}) // Token Expires in 30 seconds
            res.json({id:user.id,name:user.username,mobile:user.mobilenumber,email:user.email,token:token})
        }
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