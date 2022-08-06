const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const UserModel =require("../models/ContectModel")
const AdminModel= require("../models/adminmodel")
const jwt = require('jsonwebtoken');
const Controller = require("../controllers/ContactController")
const Controllers2 = require("../controllers/Bookcontroller")

//user//
router.post("/user/signup",Controller.signup)
router.post("/user/login",Controller.login)
router.post("/user/logout",Controller.logout)
//admin//
router.post("/admin/signup",Controller.Adminsignup)
router.post("/admin/login",Controller.Adminlogin)
router.post("/admin/logout",Controller.Adminlogout)
//admin CRUD opertion on user//
router.post("/admin/createuser",authorize,Controller.AdminUserSignup)
router.get("/admin/readuser",authorize,Controller.getUser)
router.post("/admin/userupdate/:id",authorize,Controller.AdminUserUpdate)
router.post("/admin/deleteuser/:id",authorize,Controller.AdminDeleteUser)




//router.post("/create",Controllers.createUser)
/*router.post("/signup",async(req,res)=>{
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
            res.status(200).send({msg:"login successfull",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
})*/
/*router.post("/login",async(req,res)=>{
    const data =req.body
    const result=await UserModel.signInStatics(data)
    console.log(result)
    res.send(result)
})*/
router.post("/updatepassword",authorize,async (req,res)=>{
    const data=req.body
    try{
        const hashedpassword=await bcrypt.hash(data.password,4)
        console.log(hashedpassword)
        const updated=await UserModel.findOneAndUpdate({email:req.token.email},{password:hashedpassword})
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
})
/*router.post("/adminlogin",async(req,res)=>{
    const data =req.body
    console.log(data)
    const result=await AdminModel.signInStatics(data)
    console.log(result)
    res.send(result)
})*/

/*router.post("/admincreateuser",authorize,async(req,res)=>{
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
})*/
//router.post("/user/logout",Controller.logout)//
/*router.post("/admin/updateuser/:id" ,authorize,async (req,res)=>{
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
})*/
/*router.post("/admin/deleteUser/:id",authorize,async function(req,res){
    var task=await UserModel.findOneAndDelete({
        _id:req.params.id
    })
    return res.send("User id deleted Successfully");
})*/
/*router.post("/adminsignup",async(req,res)=>{
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
            const result=await user.signUp()
            res.status(200).send({msg:"login successfull",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
})*/

function authorize (req,res,next){
    try{
        let reqheader=req.headers['authorization']
        const token= reqheader.replace("Bearer ","")
        console.log(token)
        const verifiedtoken=jwt.verify(token,'jamesbond')
        req.token=verifiedtoken 
        next()
        return
    }
    catch(err){
        console.log(err)
        res.send({msg:"you are not authorized go to login page!!",status:false})
    }
}
module.exports=router
