const express = require('express')
const dalProduct = express.Router()
const fs = require('fs')
const newDB = require('../moduels/db')


dalProduct.get('/delete/:id' , async (req , res)=>{
    const db = await newDB.connection()
    let check = await db.query(`SELECT * FROM order_list WHERE product_id = ${req.params.id}`)
    let getAll = await db.query(`SELECT * FROM product WHERE id = ${req.params.id}`)
    let result = await db.query(`SELECT * FROM product`)
    if (check.length >= 1 ){
        res.status(200).render('inventory' , {result : result , check : 'You cant Delete a product that still in the order list!'})
    }else{
        fs.unlinkSync(getAll[0].image)
        let wait = await db.query(`delete from product where id = ${req.params.id}`)
        res.status(200).redirect('/web/inventory')
    }
})

module.exports = dalProduct