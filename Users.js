const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String, 
        required:true, 
        min:2,
        max:20,
        unique:true
    }, 
    lastname:{
        type:String, 
        required:true, 
        min:2,
        max:19,
        unique:true
    },
    email:{
        type:String, 
        required:true,
        max:50, 
        unique:true
    },
    password:{
        type:String, 
        required:true, 
        min:8
    },
    profilePicture:{
        type:String, 
        default:""
    },
    coverPicture:{
        type:String, 
        default:""
    },
    friends:{
        type:Array, 
        default:""
    }, 
    isAdmin:{
        type:Boolean,
        default:false
    }, 
    setTimeDate:{
        type: Date, 
        required: true,
        default: Date.now 
    }

});

module.exports = mongoose.model("User", UserSchema);
