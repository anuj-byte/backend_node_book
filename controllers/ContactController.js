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
Controllers.signup = async(req,res)=>{
    const data=req.body

    const user=await UserModel.findOne({email:data.email})
    if(user){
        res.status(400).send({msg:"email exits already",status:false})
    }
    else{
        try{
            const hashedpassword=await bcrypt.hash(data.password,4)
            const user = new UserModel({
                email:data.email,
                password:hashedpassword,
                role:data.role,
                age:data.age,
                country:data.country,
                pincode:data.pincode
            })
            console.log("i am here")
            const result=await user.signUp()
            res.status(200).send({msg:"User Signup successfull",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
}
Controllers.login = async(req,res)=>{
    const data =req.body
    const result=await UserModel.signInStatics(data)
    console.log(result)
    res.send(result)
}
Controllers.Adminsignup = async(req,res)=>{
    const data=req.body

    const user2=await AdminModel.findOne({user:data.user})
    if(user2){
        res.status(400).send({msg:"email exits already",status:false})
    }
    else{
        try{
            const hashedpassword=await bcrypt.hash(data.password,4)
            const user = new AdminModel({
                user:data.user,
                password:hashedpassword
               
            })
            const result=await user.signUp3()
            res.status(200).send({msg:"Admin signup successfull",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
}
Controllers.Adminlogin = async(req,res)=>{
    const data =req.body
    const result=await AdminModel.signInStatics(data)
    console.log(result)
    res.send(result)
}
Controllers.Adminlogout = async function(req,res){
    return res.send("logout successfull")
}
Controllers.AdminUserSignup = async(req,res)=>{
    const data=req.body

    const user=await UserModel.findOne({email:data.email})
    if(user){
        res.status(400).send({msg:"email exits already",status:false})
    }
    else{
        try{
            const hashedpassword=await bcrypt.hash(data.password,4)
            const user = new UserModel({
                email:data.email,
                password:hashedpassword,
                role:data.role,
                age:data.age,
                country:data.country,
                pincode:data.pincode
            })
            const result=await user.signUp()
            res.status(200).send({msg:"signup successfull of user from admin side",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
}
Controllers.AdminUserUpdate =async (req,res)=>{
    const data=req.body
    console.log(data)
    try{
        const hashedpassword=await bcrypt.hash(data.password,4)
        const country=await data.country
        const role =await data.role
        const pincode=await data.pincode
        const address=await data.address
        const age =await data.age

        console.log(hashedpassword)
        const updated=await UserModel.findOneAndUpdate({_id:req.params.id},{email:data.email,password:hashedpassword,country:country,pincode:pincode,role:role,age:age})
        console.log(updated)
        if(updated){
            res.status(201).send({msg:"update successfully",status:true})
        }
        else{
            res.status(404).send({msg:"update failed",status:false})
        }
    }
    catch(err){
        console.log(err)
        res.send("updated err")

    }
}
Controllers.AdminDeleteUser = async function(req,res){
    var task=await UserModel.findOneAndDelete({
        _id:req.params.id
    })
    return res.send("User id deleted Successfully");
}
module.exports=Controllers 