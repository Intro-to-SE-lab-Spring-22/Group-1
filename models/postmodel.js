let mongoose = require('mongoose');


let postschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    status:{
        type: String,
        required: function(){return this.status.length >= 1 || this.status.length <= 400}
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