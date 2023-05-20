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
    console.log(user[0])
    return user
}
module.exports ={getUsers,findUser}