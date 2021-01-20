// const { MongoClient, ObjectID } = require('mongodb');
const IndexCards = require('../schemas/IndexCardsSchema');
const debug = require('debug')('app:pagesFunctions');


async function getIndexCards() {
    const indexCards = await IndexCards.collection.find().toArray()
    debug(indexCards)
    return indexCards
}

module.exports = {
    getIndexCards
}