const express = require('express');
const router = express.Router()
const connection = require('../connection')

// GET
const mPage = router.get('/', (req, res)=> {
    const sql =` SELECT f.*, r.product_sku, r.date, p.product_name 
                    FROM formulas f 
                    LEFT JOIN (all_recipes r CROSS JOIN NK_Products p)
                    ON f.recipe_id = r.recipe_id AND p.product_sku = r.product_sku `
    connection.query(sql, (err, rows) => {
        if(err) throw err
        return res.json(rows)
    })
})

const getBottleSize = router.get('/nbottles', (req, res) => {
    const sql = `SELECT r.n_bottles FROM all_recipes r WHERE r.recipe_id = ?`;
    const id = req.body.id;
    connection.query()
})

// get POST ingredient TYPE from front end and returns only according ingerdients
const getType = router.post(`/type`, (req, res) => {
    const type = req.body.chosenType;
    // console.log(req.body.chosenType);
    connection.query('SELECT name, material_sku FROM materials WHERE material_type = ?', [type], (err, rows) => {
        if( err) res.json("ERROR")
            // console.log(rows)
        return res.json(rows)
    })
})

const getTotalCost = router.post('/totalCost', (req, res) => {
    const id = req.body.chosenP;
    // console.log(id)
    const  sql = `SELECT SUM(f.cost) AS 'total_cost' , SUM(f.quantity) AS 'total_quan'
                    FROM formulas f
                    WHERE f.recipe_id = ?`;
    connection.query(sql, [id], (err, rows) => {
        if(err) throw err
        // console.log(rows)
        return res.json(rows)
    })
})


let quantity = 0;
let chosenInSKU = '';
// Calculate raw material cost for each ingre
const getCost = router.post('/cost', (req, res) => {
    quantity = req.body.quantity;
    material_sku = req.body.material_sku;
    // console.log(chosenInSKU)

    const sql = `SELECT m.material_sku, m.standard_quantity, m.measurememnt_unit,  c.cost_per_item,
                    ((c.cost_per_item/m.standard_quantity)* ?) AS 'cost'
                    FROM materials m INNER JOIN material_cost c
                    ON m.material_sku = c.material_sku WHERE m.material_sku = ?`
    connection.query(sql,[quantity, material_sku],
                    (err, rows) => {
                        if(err) throw err
                        return res.json(rows), quantity, material_sku;
                    })
})


// TO DO: insert UNiqUe recipe first 
// insert ingredients
const insertIngre = router.post('/', (req, res) => {
    const id = req.body.recipeID;
    const sku = req.body.material_sku;
    const name = req.body.name;
    const quantity = req.body.quantity;
    const cost = req.body.calculatedCost;
    const percentage = req.body.percentage;
    const sql = `INSERT INTO formulas(recipe_id, material_sku, name, quantity, cost, percent_per_recipe)
                VALUES (?, ?, ?, ?, ?, ?)`
    connection.query(sql, [id, sku, name, quantity, cost, percentage], (err, rows ) => {
        if(err) throw err
        return res.json(rows)
    })
})


// POST
const newRecipe = router.post('/add', (req, res) => {
    const recipeName = req.body.recipeName;
    const chosenP = req.body.chosenP;
    const sql = `INSERT INTO all_recipes(recipe_id, product_sku, date) VALUES (?, ?, NOW())`;
    connection.query(sql, [recipeName, chosenP], (err, rows) => {
        if(err) throw err
        return res.json(rows)
    })
})
module.exports = mPage,getTotalCost,
                 getType, getCost, newRecipe, insertIngre;