//middlewares section
const { v4 } = require("uuid");
const database=require("./database/model")
const multer=require('multer')
// const io=require("socket.io")(8080)

//registration middleware
 //using sockets
 const io=require("socket.io")(8081, {
  cors:{
      origin:[]
  }
})

io.on("connection", socket=>{
  // console.log("your id is"+ socket.id)

  socket.on("sendMessage", async(val)=>{
      // console.log(val)
    //    var check = "SELECT * FROM messages WHERE myId = ? AND otherId = ? OR myId = ? AND otherId = ?";
    //    //  var values2=[val.id, val.id]
    //    database.query(check, [ val.id, val.recipientID, val.recipientID, val.id], (err, result) => {
    //         if(result.length===0){
    //          socket.broadcast.emit("recieveMessage", "no result")
    //         }else{
    //            socket.broadcast.emit("recieveMessage", result)
    //         }
    //        })
    // })
    // socket.on("fetchMessages", (val)=>{
    //   const {myId, friend}=val
    //   var check = "SELECT * FROM messages WHERE myId = ? AND otherId = ? OR myId = ? AND otherId = ?";
    //    //  var values2=[val.id, val.id]
    //     database.query(check, [ myId, friend, friend, myId], (err, result) => {
    //         if(result.length===0){
    //          socket.broadcast.emit("recievedData", "no result")
    //         }else{
    //            socket.broadcast.emit("recievedData", result)
    //         }
    //        })
    // })
  // socket.emit(`you connected with id ${socket.id}`)
})
})

const storage=multer.diskStorage({
  destination: function(req, file, cd){
    cd(null, "../my-app/public/upload")
  },
  filename:function(req, file, cd){
    cd(null, file.originalname);
  }
})
const upload=multer({storage})
//   upload.single("file")

// const upload=multer({
//     dest:"../my-app/public/upload"
// })
const uploadImage=upload.single("file")


const register=async(req, res, next)=>{
    const {name, email, img}=req.body
    console.log(req.body)
    // console.log(req.file)
    const longID=v4()
    const date=new Date()
    // uploadImage()

    var check = "SELECT * FROM users WHERE email = ? AND name = ?";
    database.query(check, [email, name], (err, result) => {
        if(result.length!==0){
        // console.log("user already exists", result[0].id)
        res.send({message:"user exists", id:result[0].id})
        }else{
      var sql = `INSERT INTO users (name, id, email, date, img) VALUES?`;
      var values = [[name, longID,email ,date, img]];
      database.query(sql, [values], function (err, result){
       if(err) throw err
       else{
        res.send({message:"welcome newuser", id:longID})
       }
      })
        }
    })
    // next()
    
}

const login=async(req, res, next)=>{
  const {name, email}=req.body
  //  var name
   var check = "SELECT * FROM users WHERE name = ? AND email = ?";
    database.query(check, [name, email], (err, result) => {
       if(err) throw err
      //  console.log(result)
       if(result.length===0){
        res.send("user not found")
       }else{
        res.send(result[0])
       }
      //  name=result[0].name
      //  res.send(result)
    })
}

const findUsers=async(req, res, next)=>{
  var check = "SELECT * FROM users ";
  database.query(check, (err, result) => {
      if(result.length===0){
        res.send([])
      }else{
        res.send(result)
      }
  })
}

const findUser=async(req, res, next)=>{
   const {id, myId}=req.body
   var name
   var img
   var check = "SELECT * FROM users WHERE id = ?";
    database.query(check, [id], (err, result) => {
       if(err) throw err
       name=result[0].name
       img=result[0].img
      //  res.send(result)
    })
    var check = "SELECT * FROM messages WHERE myId = ? AND otherId = ? OR myId = ? AND otherId = ?";
    //  var values2=[val.id, val.id]
     database.query(check, [myId, id, id,myId], (err, result) => {
         if(result.length!==0){
          res.send({messages:result, name:name, img:img})
         }else{
          res.send({messages:[], name:name, img:img})
         }
        })
  }

  const sendMessage=async(req, res, next)=>{
    // console.log(req.body)
    const {message, name, id, recipientID, time}=req.body
    // res.send(req.body.mainData.status)
    var sql = `INSERT INTO messages (message,myId,otherId,timeRecieved) VALUES?`
       var values = [[message, id, recipientID, time]];
      database.query(sql, [values], function (err, result) {
         if (err) throw err;
         res.send("done")
        //  socket.broadcast.emit("recieveMessage", result)
        //  console.log("done");
       });
  }
  const fetchMessages=async(req, res,next)=>{
    const {myId, friend}=req.body
      var check = "SELECT * FROM messages WHERE myId = ? AND otherId = ? OR myId = ? AND otherId = ?";
       //  var values2=[val.id, val.id]
        database.query(check, [ myId, friend, friend, myId], (err, result) => {
            if(result.length===0){
            //  res.send("none")
               return
            }else{
              var newArr=[]
              result.forEach((item, i)=>{
                var obj={
                  message:[item.message],
                  myId:item.myId,
                  otherId:item.otherId,
                  timeRecieved:item.timeRecieved
                }
                newArr.push(obj)
              })
               res.send(newArr)
            }
           })
  }





// const confirm=async(req, res, next)=>{
//     const {code}=req.body
//     var check = "SELECT * FROM users WHERE code = ?";
//     database.query(check, [code], (err, result) => {
//        if(!result){
//         res.send("you are not reqistered")
//         console.log("you are not reqistered")
//        }else{
//         console.log(result)
//         res.send(result[0])
//        }
//     })
// }


module.exports={register, findUsers, findUser, sendMessage, fetchMessages, login, uploadImage}