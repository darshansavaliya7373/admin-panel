var express = require('express');
var routes = express.Router();
var categorycontroller = require('../controller/categorycontroller');


routes.get('/add_category',categorycontroller.add_category)
routes.post('/add_category_post',categorycontroller.add_category_post)
routes.get('/view_category',categorycontroller.view_category)
routes.get('/deletecategory/:id',categorycontroller.deletecategory)
routes.get('/updatecategory/:id',categorycontroller.updatecategory)
routes.post('/categoryupdate',categorycontroller.categoryupdate)



module.exports = routes;