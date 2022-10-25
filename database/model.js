const mysql=require("mysql2")

const connectDB=mysql.createConnection({
    host:process.env.MYSQL_CHAT_HOST,
    user: process.env.MYSQL_CHAT_USER,
    password: process.env.MYSQL_CHAT_PASSWORD,
    port:3306,
    database:process.env.MYSQL_CHAT_DATABASE
})
connectDB.connect((err)=>{
    if(err) throw err
    console.log("connected to db")
})
module.exports=connectDB