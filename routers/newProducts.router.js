const express = require('express')
const newProduct = express.Router()
const multer = require('multer')
const Typemulter = require('multer')
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

newProduct.get('/add' , async (req , res)=>{
  const db = await newDB.connection()
  let query = `SELECT * FROM category`
  let result = await db.query(query)
  res.status(200).render('newProduct' , {result : result});
})

newProduct.post('/new' , upload.single('image') , async (req , res)=>{
  let cateId
  if(!req.file){
    res.redirect('/web/bakery')
  }

  if (req.body.new_type){
    if(req.body.Dcategory > 0) {
      const db = await newDB.connection()
      let query = `DELETE FROM category WHERE id = "${req.body.Dcategory}"`
      let result = await db.query(query)
      console.log(result)
  
    }
    const db = await newDB.connection()
    let query = `INSERT INTO category (name) VALUES ("${req.body.new_type}")`
    let result = await db.query(query)
    console.log(result)

    cateId = result.insertId

    let Iquery = `INSERT INTO product (category,name,image,unit,price,stok,produce,end) VALUES ("${cateId}" , "${req.body.name}" , "${req.file.path.replace(/\\/g, "\\\\")}" , "${req.body.unit}" , "${req.body.price}" , "${req.body.stok}" , "${req.body.produce}" , "${req.body.end}")`
    let rresult = await db.query(Iquery)
  } else {
    if(req.body.Dcategory > 0) {
      const db = await newDB.connection()
      let query = `DELETE FROM category WHERE id = "${req.body.Dcategory}"`
      let result = await db.query(query)
      console.log(result)
  
    }
    const db = await newDB.connection()
    let query = `INSERT INTO product (category,name,image,unit,price,stok,produce,end) VALUES ("${req.body.category}" , "${req.body.name}" , "${req.file.path.replace(/\\/g, "\\\\")}" , "${req.body.unit}" , "${req.body.price}" , "${req.body.stok}" , "${req.body.produce}" , "${req.body.end}")`
    let result = await db.query(query)
  }
//INSERT INTO `category`(`name`) VALUES ("")


  res.redirect('/web/bakery');
            
})


module.exports = newProduct