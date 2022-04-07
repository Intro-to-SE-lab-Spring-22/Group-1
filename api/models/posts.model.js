let mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    }, 
    userID:{
        type: String
    },
    timelinePost: {
        type: String, 
        max: 400,
        min: 1
    }, 
    image: {
        type: String, 
    }, 
    likes: {
        type: Array, 
        default: []
    },
    comments: {
        type: Array, 
        default: [{type: mongoose.Types.ObjectId, ref:'comments'}],
    },
    timestamp:{
        type: Date, 
        required: true,
        default: Date.now 
    }
})

module.exports = mongoose.model("Post", postSchema);