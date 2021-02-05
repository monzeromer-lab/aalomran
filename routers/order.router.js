const express = require('express')
const Order = express.Router()
const newDB = require('../moduels/db')

Order.use(express.json())

Order.get('/bakery' , async (req , res)=>{
    const db = await newDB.connection()
    let result =  await db.query("SELECT * FROM product WHERE availability = 1")
    let order =  await db.query("SELECT order_list.id , order_list.quantity , order_list.total , product.name, product.unit , product.price , (SELECT SUM(total) FROM order_list) AS full_price FROM order_list INNER JOIN product ON order_list.product_id=product.id")
    res.status(200).render('bakry' , {result : result , title : 'All' , orders : order})
})

Order.post('/new_product' , async (req , res)=>{
    const db = await newDB.connection()
    let result =  await db.query(`SELECT * FROM product WHERE id = '${req.body.product}' and availability = 1`)
    let total = result[0].price * req.body.quantity
    let wait = await db.query(`INSERT INTO  order_list (product_id , quantity, total) VALUES ('${req.body.product}' , '${req.body.quantity}' , '${total}' )`)
    res.status(200).json('Added')
})

Order.get('/delete/:id' , async (req , res)=>{
    const db = await newDB.connection()
    let result =  await db.query(`DELETE FROM order_list WHERE id = '${req.params.id}'`)
    res.status(200).redikrect('/web/baery')
})

Order.get('/delete_all' , async (req , res)=>{
    const db = await newDB.connection()
    let result =  await db.query(`TRUNCATE TABLE order_list`)
    res.status(200).redirect('/web/bakery')
})

Order.post('/edit' , async(req , res)=>{
    const db = await newDB.connection()
    let orders =  await db.query(`SELECT product_id FROM order_list WHERE id = '${req.body.product}'`)
    let cal =  await db.query(`SELECT * FROM product WHERE id = '${orders[0].product_id}' and availability = 1`)
    let total = cal[0].price * req.body.quantity
    let query = `update order_list set  quantity = '${req.body.quantity}' , total = '${total}' where product_id = '${cal[0].id}'`
    let result = await db.query(query)
    res.status(200).json("Edited")
})
module.exports = Order