Amran Bakery
Project Prepared by Abdullah Al-Omran

About The Source Code:
1- The "index.js" file:
the main file That start the Express server in  process.env.PORT or in 2021 if process.env.PORT not found (depend in the enviroment)
calling all the other routers it this part:
///////////////////////////////////////////////////////////
const New_Product = require('./routers/newProducts.router')
const Manage_Product = require('./routers/mangPro.router')
const Inv_Router = require('./routers/inven.router')
const Delete_Product = require('./routers/delProduct.router')
const Get_Product = require('./routers/getProducts.router')
const Create_Order = require('./routers/order.router')
const newDB = require('./moduels/db')

app.use('/web/products' , New_Product)
app.use('/web/products' , Manage_Product)
app.use('/web/products' , Delete_Product)
app.use('/web/products' , Get_Product)
app.use('/web',Create_Order)
app.use('/web',Inv_Router)
///////////////////////////////////////////////////////////

the static router:
in the index file
app.use('/web/public' ,express.static(path.join(__dirname, 'public')))
this line of code allows the client to reqest static files like images or styles or javascript sources

the "isam.sql" Source:
contain the query that build the product database table
the "order_list.sql" Source:
contain the query that build the orders database table

## The Routers Sources:
"delProduct.router.js":

GET /web/delete/':id'
the id is a query parameter

delete product using it's id then redirect the user to the inventory page

"getProduct.router.js":
GET /web/products/getbytype/':type'
type is the product type

using for the order now page to show orders by type like beard or something else

"inven.router.js":
GET /web/inventory
list all the product to delete them or delete them

"mangProduct.router.js":
GET /web/products/edit/':id'
id is the product id that the client want to edit

this endpoint insert the current value for the product to make it easier for the use if he need to change a little thing 

POST /web/products/edit/':id'
id is the product id 

post the data that the user has entered

"newProduct.router.js":

GET /web/products/add
render the add product page

POST /web/products/new
post the new product

"order.router.js":

GET /web/Bakery
Render the Bakery page

POST /web/new_product 
add new product to order list 

GET /web/delete/':id'
id is the order id
delete order by it's id

GET /web/delete_all
delete all the orders

POST /web/edit
edit order quantity

modals folder contain the database connection code

iisnode folder is used by the server for the logs

web.config file used by the server "DO NOT EDIT IT"
package.json and package-lock.json files used by node.js