const express=require("express")
const {getUsers,findUser} = require("../database.js")
const router= express.Router()
//JWT AND SECRET
const jwt=require("jsonwebtoken")
var SECRET=require('crypto').randomBytes(64).toString('hex')


//GET USER Details
router.get("/",authenticateToken,async (req, res)=>{
    try{
    const users= await getUsers()
    res.send(users.filter(user=>user.id==req.user.id))
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke"})
    }
})

//User Login
router.post("/login",async (req, res)=>{
    console.log(SECRET)
    try{
        const user= await findUser(req.body.username,req.body.password)
        if (!user)
        {
            res.status(404).send({error:"User Not Found or Invalid Credentials"})
        }
        else
        {
            const token=jwt.sign(user,SECRET,{expiresIn:"30s"})
            res.json({id:user.id,name:user.username,mobile:user.mobilenumber,email:user.email,token:token})
        }
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke"})
    }
})



//Middleware for Authentication
function authenticateToken(req,res,next){
     const authHeader=req.headers['authorization']
     const token=authHeader && authHeader.split(' ')[1]
     if (token==null) return res.sendStatus(401)
    jwt.verify(token,SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user=user
        next()
    })
}

module.exports=router