const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const KromosSchema = Schema({
    id_kromo: {
        type: Number
    },
    lo_tienen: {
        type: Array
    },
    lo_quieren: {
        type: Array
    }
});

module.exports = mongoose.model('Kromos', KromosSchema)