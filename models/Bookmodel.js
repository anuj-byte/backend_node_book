const mongoose = require("mongoose")
const Schema =mongoose.Schema
const UserSchema=new Schema({
    BookName:{
        type:String,
        required:true,
        unique:true
    },
    AuthorName:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    }
})
UserSchema.methods.signUp=async function(){
    await this.save()
}
const BookModel=mongoose.model("BookModel",UserSchema)
module.exports=BookModel