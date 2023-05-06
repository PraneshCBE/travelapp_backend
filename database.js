const mysql =require('mysql2')
require('dotenv').config()
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
module.exports ={getUsers}