const express = require('express');
const router = express.Router()
const connection = require('../connection')


const allProducts  = router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM NK_products', (err, rows) => {
        if(err) throw err
        return res.json(rows)
    })
})

module.exports = allProducts;