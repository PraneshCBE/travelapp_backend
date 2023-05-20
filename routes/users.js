const express=require("express")
const {getUsers,findUser} = require("../database.js")
const router= express.Router()

router.get("/",async (req, res)=>{
    try{
    const users= await getUsers()
    res.send(users)
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke"})
    }
})

router.post("/login",async (req, res)=>{
    try{
        const user= await findUser(req.body.username,req.body.password)
        if (!user)
        {
            res.status(404).send({error:"User Not Found or Invalid Credentials"})
        }
        else
        {
            res.send(user)
        }
    }catch(err)
    {
        console.log(err.stack)
        res.status(500).send({error:"Something Broke"})
    }
})

module.exports=router