require("dotenv").config()
const express=require("express")
const app=express()
const connectDB=require('./database/model')
const cors=require('cors')
const fileUpload = require('express-fileupload');
// const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const path=require("path")
const authenticate=require("./routes/register")
const getUsers=require("./routes/getUsers")
const findUser=require("./routes/findUser")
const sendMessage=require("./routes/sendMessage")
const fetchMessages=require("./routes/fetchMessages")
const login=require("./routes/login")
const multer=require('multer')



app.use(cors({
    origin:["https://chat-mee-up.herokuapp.com/"],
    // origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// bodyParser.json([options])
// app.use(fileUpload());

// const storage=multer.diskStorage({
//     destination: function(req, file, cd){
//       cd(null, "../my-app/public/upload")
//     },
//     filename:function(req, file, cd){
//       cd(null, file.originalname);
//     }
//   })
//   const upload=multer({storage})
// //   upload.single("file")

// // const upload=multer({
// //     dest:"../my-app/public/upload"
// // })
// const uploadImage=upload.single("file")
  
app.get('/', (req, res)=>{
    res.send({"message":"welcome! Its working well"})
})

app.use("/api",authenticate)
app.use("/api", getUsers)
app.use("/api", findUser)
app.use("/api", sendMessage)
app.use("/api", fetchMessages)
app.use("/api", login)
// app.post("/api/upload",uploadImage, (req, res)=>{
//     const file=req.file
//     res.send(file.filename)
//     console.log(file)
//     // res.redirect("http://localhost:3000/login")
//   })



app.listen(process.env.PORT || 8080, ()=>{
    console.log("app is listening")
})