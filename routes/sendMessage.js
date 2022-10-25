const express=require('express')
const route=express.Router()
const {sendMessage}=require("../auth")

route.post('/sendMessage', sendMessage)

module.exports=route