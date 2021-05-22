const mongoose = require('mongoose')
const debug = require('debug')('app:schema')


const galleryImageSchema = new mongoose.Schema({
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
const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema);

module.exports = GalleryImage;