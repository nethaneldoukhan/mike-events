const mongoose = require('mongoose')
const debug = require('debug')('app:schema')


const gallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: Array,
        required: true,
        trim: true,
    },
    order: {
        type: Number,
        required: true,
        trim: true,
    }
});
const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;