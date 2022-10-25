const express=require("express")
const route=express.Router()
const {register, uploadImage}=require("../auth")

route.post('/newUser',register)

module.exports=route