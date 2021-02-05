const express = require('express')
const newProduct = express.Router()
const multer = require('multer')
const newDB = require('../moduels/db')
const path = require('path')

const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
      cb(null, "IMG-" + Date.now() + path.extname(file.originalname))
    }
  })
  
const  upload = multer({ storage: storage })

newProduct.use(express.json())

newProduct.get('/add' , (req , res)=>{
  res.status(200).render('newProduct');
})

newProduct.post('/new' , upload.single('image') , async (req , res)=>{
  if(!req.file){
    res.redirect('/web/bakery')
  }
  const db = await newDB.connection()
  let query = `INSERT INTO product (category,name,image,unit,price,stok,produce,end) VALUES ("${req.body.category}" , "${req.body.name}" , "${req.file.path.replace(/\\/g, "\\\\")}" , "${req.body.unit}" , "${req.body.price}" , "${req.body.stok}" , "${req.body.produce}" , "${req.body.end}")`
  let result = await db.query(query)
  res.redirect('/web/bakery');
            
})


module.exports = newProduct