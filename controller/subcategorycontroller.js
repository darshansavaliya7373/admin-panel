// var path = require('path');
// var fs = require('fs');
const subcategory =require('../models/subcategory'); 
const category =require('../models/category'); 



module.exports.add_subcategory =function(req, res){

    category.find({}, function(err, category){

        if(err){
            console.log(err);
        }

        return res.render('add_subcategory',{
            data: category,
        })
    })

}

module.exports.add_subcategory_post =function(req, res){


    subcategory.create({

        categoryid: req.body.categoryid,
        subcategory: req.body.subcategory

    },function(err){
        if(err){
        console.log(err);
               }
       return false
    })
    req.flash('success','subcategory added successfully')
    return res.redirect('add_subcategory')

}

module.exports.view_subcategory = async function(req,res){

    let data=await subcategory.find({}).populate('categoryid').exec();
    
    return res.render('view_subcategory',{
        subdata:data
    })

}

