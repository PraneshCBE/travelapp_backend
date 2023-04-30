const mysql =require('mysql2')
require('dotenv').config()
console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)
const dbconnection= mysql.createPool({
    host: process.env.HOST,
    user: "localuh",
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}).promise()

async function getUsers(){
    const [rows]= await dbconnection.query("SELECT * FROM travel_app")
    return rows
} 
module.exports ={getUsers}