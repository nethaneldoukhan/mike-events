const https = require('https')
// const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
// const cookieParser = require('cookie-parser')
// const session = require('express-session')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
// const { MongoClient, ObjectID } = require('mongodb');
const morgan = require('morgan')
const debug = require('debug')('app:server')
const chalk = require('chalk')
const IndexCards = require('./src/schemas/IndexCardsSchema');
const pagesFunctions = require('./src/functions/pagesFunctions')
const port = process.env.PORT || 8000
const dotenv = require('dotenv')
const Gallery = require('./src/schemas/GallerySchema')
const GalleryImage = require('./src/schemas/GalleryImageSchema')
dotenv.config()
const connectionUrl = process.env.DB_URI
// const upload = ('file-upload')


// const authRouter = require('./src/routes/authRoutes')()
// const paymentsRouter = require('./src/routes/paymentsRoutes')()
// const adminRouter = require('./src/routes/adminRoutes')()
const dashboardRouter = require('./src/routes/dashboardRoutes')()
// const searchRouter = require('./src/routes/searchRoutes')()
// const calendarRouter = require('./src/routes/calendarRoutes')()
// const forgotRouter = require('./src/routes/forgotRoutes')()
// const fileUpload = require('express-fileupload')



app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use(cookieParser())
// app.use(session({secret: 'nm'}))
// app.use(fileUpload())
// app.use('/auth', authRouter)
// app.use('/admin', adminRouter)
app.use('/dashboard', dashboardRouter)
// app.use('/payments', paymentsRouter)
// app.use('/search', searchRouter)
// app.use('/calendar', calendarRouter)
// app.use('/forgot_password', forgotRouter)

app.use(express.static(path.join(__dirname, '/public')))
app.use(morgan('tiny'))

app.set('views', './src/views')
app.set('view engine', 'ejs')




app.get('/', (req, res) => {
    (async () => {
        // const response = await IndexCards.collection.insertOne({"name": "Concert", "description": "ffdygfi fyfiygfi gfgfi ufifi yfiuyfufg guyfgufuf hguhgio", "photo": "audience.jpg", "order": 4})
        const indexCards = await IndexCards.collection.find().sort({"order": 1}).toArray()
        debug(indexCards)
        res.render('pages/index', {
            pageTitle: 'Acceuil - Prestations événementielles',
            indexCards,
            classContactBody: ""
        })
    })()
})


app.get('/galerie', (req, res) => {
    (async () => {
        let completeGalleryImage = []
        // await GalleryImage.collection.insertOne({"gallery_id": "6009acdc0f3c61303081e249", "name": "computer and flowers 2", "description": "computer and flowers 2", "image": "computer_and_flowers2.jpg", "order": 1})
        // await GalleryImage.collection.insertOne({"gallery_id": "6009acdc0f3c61303081e249", "name": "demande mariage", "description": "demande mariage", "image": "demande_mariage.jpg", "order": 2})
        // await GalleryImage.collection.insertOne({"gallery_id": "6009acdc0f3c61303081e249", "name": "hand On Computer 2", "description": "hand On Computer 2", "image": "handOnComputer2.jpg", "order": 3})
        // await GalleryImage.collection.insertOne({"gallery_id": "6009acdc0f3c61303081e249", "name": "mariage", "description": "mariage", "image": "mariage.jpg", "order": 4})
        // await GalleryImage.collection.insertOne({"gallery_id": "6009acdc0f3c61303081e249", "name": "working on code 2", "description": "working on code2", "image": "working-on-code2.jpg", "order": 5})
        // const response = await GalleryImage.collection.insertOne({"name": "Mariage", "order": 2})
        // const response = await GalleryImage.collection.insertOne({"name": "Bar Mitzva", "order": 3})
        // const response = await GalleryImage.collection.insertOne({"name": "Concert", "order": 4})
        const gallerys = await Gallery.collection.find().sort({"order": 1}).toArray()
        for (const gallery of gallerys) {
            const galleryImages = await GalleryImage.collection.find({"gallery_id": gallery._id.toString()}).sort({"order": 1}).toArray()
            const buildGalleryImage = {"gallery": gallery, galleryImages: galleryImages}
            completeGalleryImage.push(buildGalleryImage)
        }
        debug(completeGalleryImage)
        res.render('pages/galerie', {
            pageTitle: 'Galeries - Prestations événementielles',
            completeGalleryImage,
            classContactBody: ""
        })
    })()
})


app.get('/contact', (req, res) => {
    (async () => {
        res.render('pages/contact', {
            pageTitle: 'Contact - Prestations événementielles',
            classContactBody: 'bg-body-contact'
        })
    })()
})


app.get('/a_propos', (req, res) => {
    (async () => {
        res.render('pages/a_propos', {
            pageTitle: 'A propos - Prestations événementielles',
            classContactBody: ''
        })
    })()
})

// app.get('/admin', (req, res) => {
//     (async () => {
//         res.render('pages/admin', {
//             pageTitle: 'Admin - Prestations événementielles',
//             indexCards,
//             classContactBody: ''
//         })
//     })()
// })


// 404 page
app.get('*', (req, res) => {
    (async () => {
        res.status(404).render('pages/error', {
            pageTitle: 'Page introuvable',
            classContactBody: ''
        })
    })()
})



const start = async () => {
    await mongoose.connect(
        // 'mongodb://127.0.0.1/mike-events', //local
        'mongodb+srv://mike-events:00000000@mike-events.s7mmd.mongodb.net/mike-events?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true',
        // connectionUrl,
        // {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}
    )
    debug('Connected to db server')

    app.listen(port, () => {
        debug(`listening on port ${chalk.green(port)}`)
    })
}



module.exports = start;