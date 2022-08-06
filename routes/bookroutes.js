const express=require("express")
const router=express.Router()
const Controller2= require("../controllers/Bookcontroller")
const Bookmodel=require("../models/Bookmodel")
const UserModel=require("../models/ContectModel")
const Manager=require("./ContactManagerRoutes")
const jwt = require('jsonwebtoken');
const BookModel = require("../models/Bookmodel")
const WishModel=require("../models/Wishmodel")
const PendingModel=require("../models/pendingModel")
router.get("/",Controller2.getbooks)//show books
router.post("/admin/addbooks", authorize ,async(req,res)=>{
    const data=req.body

    const user=await Bookmodel.findOne({BookName:data.BookName})
    if(user){
        res.status(400).send({msg:"Book name exits already",status:false})
    }
    else{
        try{
           
            const user = new Bookmodel({
                BookName:data.BookName,
                AuthorName:data.AuthorName,
                Price:data.Price
    
            })
            
            const result=await user.signUp()
            res.status(200).send({msg:"Added successfully",status:true})
        }
        catch(err){
            res.status(404).send({msg:{err},status:false})

        }
    }
})
router.post("/admin/updatebook/:id",authorize ,async (req,res)=>{
    const data=req.body
    console.log(data)
    try{
        const BookName= await data.BookName
        const AuthorName= await data.AuthorName
        const Price= await data.Price

        
        const updated=await BookModel.findOneAndUpdate({_id:req.params.id},{BookName:BookName,AuthorName:AuthorName,Price:Price})
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
router.post("/admin/deletebook/:id",authorize,async function(req,res){
    var task=await BookModel.findOneAndDelete({
        _id:req.params.id
    })
    return res.send("User id deleted Successfully");
})
router.post("/addwishlist/:id",authorize,async function(req,res){
    var task=await BookModel.findOne({
        _id:req.params.id
    })

    try{
           
        const user = new WishModel({
            BookName:task.BookName,
            AuthorName:task.AuthorName,
            Price:task.Price

        })
        
        const result=await user.signUp2()
        res.status(200).send({msg:"Added successfully",status:true})
    }
    catch(err){
        res.status(404).send({msg:{err},status:false})

    }
  
})
router.post("/deletewishlist/:id",authorize,async function(req,res){
    var task=await WishModel.findOneAndDelete({
        _id:req.params.id
    })
    return res.send("User id deleted Successfully");
})
router.get("/wishlist",authorize,Controller2.getUser)

router.post("/pending/:id",authorize,async function(req,res){
    var task=await BookModel.findOne({
        _id:req.params.id
    })

    try{
           
        const user = new PendingModel({
            BookName:task.BookName,
            AuthorName:task.AuthorName,
            Price:task.Price

        })
        
        const result=await user.signUp3()
        res.status(200).send({msg:"Added successfully",status:true})
    }
    catch(err){
        res.status(404).send({msg:{err},status:false})

    }
  
})
router.post("/removepending/:id",authorize,async function(req,res){
    var task=await PendingModel.findOneAndDelete({
        _id:req.params.id
    })
    return res.send("User id deleted Successfully");
})

router.get("/pendinglist",authorize,Controller2.getPending)

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