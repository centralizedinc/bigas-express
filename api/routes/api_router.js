'use strict'

var axios = require('axios');
var express = require('express');

var api_router = express.Router();
const OrdersDao = require('../dao/OrdersDao')
const PaymentsDao = require('../dao/PaymentsDao')

api_router.route('/order')
    .post((req, res) => {
        OrdersDao.create(req.body)
            .then((result) => {
                res.json({
                    success: true,
                    model: result
                })
            }).catch((err) => {
                res.json({
                    success: false,
                    errors: err
                })
            });
    })

module.exports = api_router;