const express=require("express")
const { fetchMessages } = require("../auth")
const route=express.Router()

route.post('/fetchMessages',fetchMessages)

module.exports=route