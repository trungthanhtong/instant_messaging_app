const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    name: {type: String, required: true, trim: true},
    users: [],
    isPrivate: {type: Boolean, default: false},
    messages: []
}, {timestamps: true})

const ChatRoom = mongoose.model('ChatRoom', chatroomSchema)

module.exports = ChatRoom