const mysql =require('mysql2')
require('dotenv').config()
console.log(process.env.PASSWORD,process.env.DATABASE)
const dbconnection= mysql.createPool({
    host: process.env.HOST, 
    user: "localuh",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

async function getUsers(){
    const [rows]= await dbconnection.query("SELECT * FROM users")
    return rows
} 

async function findUser(username,password){
    const user= await dbconnection.query("SELECT * FROM users WHERE username=? AND password=?",[username,password])
    console.log(user[0][0])
    return user[0][0]
}

async function getAlarms(user_id){
    const [rows]= await dbconnection.query("SELECT * FROM location_alarm WHERE user_id=?",[user_id])
    return rows
}

async function addAlarm(user_id,location,alarm_time){
    const [rows]= await dbconnection.query("INSERT INTO location_alarm (user_id,location,alarm_time) VALUES (?,?,?)",[user_id,location,alarm_time])
    return rows
}
module.exports ={
    getUsers,
    findUser,
    getAlarms,
    addAlarm}