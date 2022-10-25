const express=require('express')
const route=express.Router()
const {findUser}=require("../auth")

route.post('/user', findUser)

module.exports=route