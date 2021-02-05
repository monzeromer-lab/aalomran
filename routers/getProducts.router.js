const express = require('express')
const getProduct = express.Router()
const newDB = require('../moduels/db')


getProduct.get('/getbytype/:type' , async (req , res)=>{
    let db = await newDB.connection()
    let result = await db.query(`select * from product where category = '${(req.params.type)}' and availability = '1'`)
    let order =  await db.query("SELECT order_list.id , order_list.quantity , order_list.total , product.name, product.unit , product.price , (SELECT SUM(total) FROM order_list) AS full_price FROM order_list INNER JOIN product ON order_list.product_id=product.id")
    res.status(200).render('bakry' , {result : result , orders : order , title : req.params.type})
})

module.exports = getProduct