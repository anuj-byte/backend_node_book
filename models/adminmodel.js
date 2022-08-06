const mongoose = require("mongoose")
const Schema =mongoose.Schema
const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt")
const UserSchema=new Schema({
    user:{
        type:String,
        required:true,
        unique:true/*,
        validate:{
            validator:function(exp){
                return /\[a-zA-Z0-9]*@[a-zA-Z]+.[a-zA-Z]{2,3}/.test(exp)
            },
            message:"this is email is not valid"
        }*/
    },
    password:{
        type:String,
        required:true
    }
})
UserSchema.methods.signUp3=async function(){
    await this.save()
}
UserSchema.statics.signInStatics=async function(data){
    const user2=await Admin.findOne({user:data.user})
    console.log(user2)
    if(user2){
        const comparison=await bcrypt.compare(data.password,user2.password)
        console.log(comparison)
        if(comparison){
            const generatedtoken=jwt.sign({user2:data.user},'jamesbond',{expiresIn:'1h',algorithm:'HS512',issuer:'olympus.gl.in'})
            console.log(generatedtoken)
            return{msg:"login successfull",status:true,token:generatedtoken,statusCode:200}
        }
        else{
            return{msg:"Please check your password",status:false,statusCode:404}
        }
    }
    else{
        return{msg:"Please check you email",status:false,statusCode:400}
    }
}
const Admin=mongoose.model("Admin",UserSchema)
module.exports=Admin
