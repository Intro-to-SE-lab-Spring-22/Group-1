let mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    }, 
    timelinePost: {
        type: String, 
        max: 400
    }, 
    image: {
        type: String, 
    }, 
    likes: {
        type: Array, 
        default: []
    },
    timestamp:{
        type: Date, 
        required: true,
        default: Date.now 
    }
})

module.exports = mongoose.model("Post", postSchema);