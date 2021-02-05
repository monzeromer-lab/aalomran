const express = require('express')
const mangProduct = express.Router()
const multer = require('multer')
const newDB = require('../moduels/db')
const path = require('path')
const fs = require('fs')

const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
      cb(null, "IMG-" + Date.now() + path.extname(file.originalname))
    }
  })
const  upload = multer({ storage: storage })

mangProduct.use(express.json())

mangProduct.get('/edit/:id' , async (req , res)=>{
  const db = await newDB.connection()
  let result = await db.query(`SELECT * FROM product WHERE id = ${req.params.id}`)
  res.status(200).render('mangProduct' , {result : result[0]});
})

mangProduct.post('/edit/:id' , upload.single('image') , async (req , res)=>{
  const db = await newDB.connection()
  let resultt = await db.query(`SELECT * FROM product WHERE id = ${req.params.id}`)
      if(req.file){
         let result = await db.query(`update product set category = '${req.body.category}' , name = '${req.body.name}',image = '${req.file.path}',unit = '${req.body.unit}',price = ${req.body.price},stok = ${req.body.stok},produce = '${req.body.produce}',end = '${req.body.end}',availability = '${req.body.availability}',sold = '${req.body.sold}' where id = ${req.params.id}`)
          fs.unlinkSync(resultt[0].image)
          res.status(200).redirect('/web/bakery')
      } else {
         let wait = await db.query(`update product set category = '${req.body.category}' , name = '${req.body.name}',unit = '${req.body.unit}',price = ${req.body.price},stok = ${req.body.stok},produce = '${req.body.produce}',end = '${req.body.end}',availability = '${req.body.availability}',sold = '${req.body.sold}'where id = ${req.params.id}`)
          res.status(200).redirect('/web/bakery')
      }
})

module.exports = mangProduct