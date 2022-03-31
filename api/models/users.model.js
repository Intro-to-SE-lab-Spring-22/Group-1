let mongoose = require('mongoose');
const passportLocalMongoose =  require("passport-local-mongoose")

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
    DOB:{
        type:Date
    },
    password:{
        type:String, 
        require:true,
        min:6
    },
    username:{
        type: String,
        min:3
    },
    profilePicture:{
        type:String, 
        default:""
    },
    coverPicture:{
        type:String, 
        default:""
    },
    friends:[{type: mongoose.Types.ObjectId, ref:'AppUser'}], 
    posts:[{type: mongoose.Types.ObjectId, ref:'Post'}],
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

AppUserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('AppUser', AppUserSchema);
