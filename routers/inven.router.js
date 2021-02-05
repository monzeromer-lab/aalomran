const express = require('express')
const invRouter = express.Router()
const newDB = require('../moduels/db')

invRouter.get('/inventory' , async (req , res)=>{
    const db = await newDB.connection()
    let result = await db.query('SELECT id,name,image,sold,stok FROM product')
    res.status(200).render('inventory' , {result : result , check : null});
})

module.exports = invRouter