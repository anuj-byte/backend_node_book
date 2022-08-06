const AdminModel=require("../models/adminmodel")
const UserModel=require("../models/ContectModel")
const express=require("express")
const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const Controllers={}
Controllers.getUser= async function(req,res){
    //const searchid=req.params.id
    var userprofile=await UserModel.find({});
    return res.send(userprofile)
    //return ContactModel.findById(searchid).then((result)=>res.send(result)). 
   // return ContactModel.then((result)=>res.send(result)).   
    //catch((err)=>res.send("err in fetch"))
    
}
Controllers.logout = async function(req,res){
    return res.send("logout successfull")
}






 


module.exports=Controllers 
