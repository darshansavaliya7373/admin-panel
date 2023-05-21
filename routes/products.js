var express = require('express');
var routes = express.Router();
var productscontroller=require('../controller/productscontroller');


routes.get('/add_products',productscontroller.add_products);
routes.post('/subdatas',productscontroller.subdatas);
routes.post('/add_products_post',productscontroller.add_products_post);
routes.get('/view_products',productscontroller.view_products)
routes.get('/go',productscontroller.go)
// routes.post('/searchproducts',productscontroller.searchproducts)

module.exports = routes;