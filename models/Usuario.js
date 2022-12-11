const { Schema, model } = require("mongoose");


const UsuaruioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
    }
});

module.exports = model('Usuario', UsuaruioSchema );