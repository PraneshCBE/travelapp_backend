const mysql =require('mysql2')
require('dotenv').config()
const dbconnection= mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

async function getUsers(){
    const [rows]= await dbconnection.query("SELECT * FROM travel_app")
    return rows
} 
module.exports ={getUsers}