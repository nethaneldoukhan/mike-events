const mongoose = require('mongoose')
const debug = require('debug')('app:schema')


const indexCardsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: Number,
        required: true
    }
});
const IndexCards = mongoose.model("IndexCards", indexCardsSchema);

module.exports = IndexCards;