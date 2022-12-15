const mongoose = require('mongoose')
const Schema  = mongoose.Schema


const MessagesSchema = Schema({

    content: {
        type: String
    },
    sender: {
        type: String
    },
    recipient: {
        type: String
    },
    timestamp: {
        type: Date
    }
});

module.exports = mongoose.model('Messages', MessagesSchema)