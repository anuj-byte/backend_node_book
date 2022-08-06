const ContactModel=require("../models/ContectModel")
const AdminModel=require("../models/adminmodel")
const WishModel=require("../models/Wishmodel")
const BookModel=require("../models/Bookmodel")
const PendingModel = require("../models/pendingModel")
const Controllers2={}
Controllers2.getUser= async function(req,res){
    //const searchid=req.params.id
    var userprofile=await WishModel.find({});
    return res.send(userprofile)
    //return ContactModel.findById(searchid).then((result)=>res.send(result)). 
   // return ContactModel.then((result)=>res.send(result)).   
    //catch((err)=>res.send("err in fetch"))
    
}
Controllers2.getbooks = async function(req,res){
    var Books =await BookModel.find({});
    return res.send(Books)
}
Controllers2.getPending = async function(req,res){
    var Books =await PendingModel.find({});
    return res.send(Books)
}

module.exports=Controllers2