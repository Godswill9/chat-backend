const express=require('express')
const route=express.Router()
const {findUsers}=require("../auth")

route.get('/users', findUsers)

module.exports=route