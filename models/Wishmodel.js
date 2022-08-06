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
UserSchema.methods.signUp2=async function(){
    await this.save()
}
const WishModel=mongoose.model("WishModel",UserSchema)
module.exports=WishModel