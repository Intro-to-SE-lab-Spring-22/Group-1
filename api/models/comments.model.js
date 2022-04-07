let mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    }, 
    userID:{
        type: String
    },
    postID:{
        type: String
    },
    postComment: {
        type: String, 
        max: 400,
        min: 1
    }
})

module.exports = mongoose.model("Comment", commentSchema);