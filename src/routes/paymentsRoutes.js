const express = require('express');
const https = require('https');
const CallBack = require('../schemas/callBackSchema');
const Log = require('../schemas/log');
const debug = require('debug')('app:payments')

const paymentsRouter = express.Router();


function router() {
    paymentsRouter.route('/')
        .get((req, res) => {
            (async () => {
                debug('payments')
                res.send('payments')
            })();
        })


    paymentsRouter.route('/callBack')
        .post((req, res) => {
            debug('receipt callBack')
            Log.collection.insertOne({"date": new Date()})
            // res.send('receipt callBack')
            const responseJson = { ...req.body }
            debug(responseJson)
            CallBack.collection.insertOne(responseJson)
            
            res.send(responseJson)
            // (async () => {
            //     let response = {
            //         'status': '',
            //         'tables': []
            //     }
            //     try {
            //         const valuesOk = checkValues(user);
            //         if (valuesOk) {
            //             const existUser = await checkExistEmail(user);
            //             if (existUser === false) {
            //                 const addUser = await insertUser(user);
            //                 response.status = 'ok';
            //                 response.tables = addUser;
            //                 res.json(response);
            //             } else {
            //                 response.status = 'Email already used';
            //                 res.json(response);
            //             }
            //         } else {
            //             response.status = 'Field/s not valid or empty';
            //             res.json(response);
            //     }
            //     } catch (err) {
            //         debug(err);
            //         response.status = 'error';
            //         res.json(response);
            //     }
            // })();
        });


    return paymentsRouter
}


module.exports = router