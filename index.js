const express = require('express')
const app = express()
const path = require('path')
const New_Product = require('./routers/newProducts.router')
const Manage_Product = require('./routers/mangPro.router')
const Inv_Router = require('./routers/inven.router')
const Delete_Product = require('./routers/delProduct.router')
const Get_Product = require('./routers/getProducts.router')
const Create_Order = require('./routers/order.router')

app.use('/web/public' ,express.static(path.join(__dirname, 'public')))
app.use('/web/products' , New_Product)
app.use('/web/products' , Manage_Product)
app.use('/web/products' , Delete_Product)
app.use('/web/products' , Get_Product)
app.use('/web',Create_Order)
app.use('/web',Inv_Router)

app.set('view engine', 'ejs')

app.get('/web', (req, res) =>{
     res.status(200).redirect('/web/bakery')
})

app.get('*' , (req , res)=>{
res.status(404).json({Error : "This page isn't available"})
})

app.post('*' , (req , res)=>{
     res.status(404).json({Error : "This page isn't available"})
})

app.listen(process.env.PORT || 2021, () => console.log(`Example app listening on port 2021!`))