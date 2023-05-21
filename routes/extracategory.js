var express = require('express');
var routes = express.Router();
var extracategorycontroller = require('../controller/extracategorycontroller');

routes.get('/add_extracategory',extracategorycontroller.add_extracategory);
routes.post('/subdata',extracategorycontroller.subdata);
routes.post('/add_category_post',extracategorycontroller.add_extracategory_post);
routes.get('/view_extracategory',extracategorycontroller.view_extracategory)

module.exports = routes;