const mongoose = require('mongoose')

//mongoose helps create schemas. MongoDB itself is schema less.
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)