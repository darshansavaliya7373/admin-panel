var express = require('express');
var routes = express.Router();
var subcategorycontroller = require('../controller/subcategorycontroller');

routes.get('/add_subcategory',subcategorycontroller.add_subcategory)
routes.post('/add_subcategory_post',subcategorycontroller.add_subcategory_post)
routes.get('/view_subcategory',subcategorycontroller.view_subcategory)

module.exports = routes;