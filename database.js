const mysql =require('mysql2')
require('dotenv').config()
const dbconnection= mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSwORD,
    database: process.env.DATABASE
}).promise()

async function getUsers(){
    const [rows]= await dbconnection.query("SELECT * FROM samp1")
    return rows
} 
module.exports ={getUsers}