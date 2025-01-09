const express = require('express');
const router = express.Router()
const connection = require('../connection')

const allMaterials  = router.get('/', (req, res) => {
    connection.query('SELECT * FROM materials', (err, rows) => {
        if(err) throw err
        return res.json(rows)
    })
})


const distinctMType = router.get('/distType', (req, res) => {
    connection.query('SELECT DISTINCT material_type FROM materials', (err, rows) => {
        if (err) throw err
        return res.json(rows)
    })
})

module.exports = allMaterials, distinctMType;