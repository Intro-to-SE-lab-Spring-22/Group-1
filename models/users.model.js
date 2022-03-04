let mongoose = require('mongoose');

let AppUserSchema = new mongoose.Schema({
    firstname:{
        type:String, 
        require:true, 
        min:2,
        max:19
    }, 
    lastname:{
        type:String, 
        require:true, 
        min:2,
        max:19
    }, 
    email:{
        type:String, 
        require:true,
        unique:true
    },
    password:{
        type:String, 
        require:true,
        min:6
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
})

module.exports = mongoose.model('AppUser', AppUserSchema)
