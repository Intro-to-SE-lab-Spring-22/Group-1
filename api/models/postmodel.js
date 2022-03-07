const mongoose = required('mongoose');


let postschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.objectID,
        required: true,
        ref: 'user'
    },
    status:{
        type: String,
        min: 1, 
        max: 400
    },
    image:{
        type: String

    },
    likes:{
        type: Array,
        default: []
    }
})
module.exports = mongoose.model('post', postschema)
