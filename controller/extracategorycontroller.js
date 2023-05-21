// var path = require('path');
// var fs = require('fs');
const subcategory =require('../models/subcategory'); 
const category =require('../models/category'); 
const extracategory=require('../models/extracategory');


module.exports.add_extracategory = (req,res)=>{

category.find({}, function(err,catedata){
    if(err){
    console.log(err);    
    return false
    }
        return res.render('add_extracategory',
        {
            data:catedata
        })
    })
}

module.exports.subdata=(req, res)=>{

    subcategory.find({categoryid:req.body.cateid}, function(err,subdata){

        if(err){
            console.log(err);
        }
        return res.render('suboption',{
            'subcatedata':subdata
        });

    })

}

module.exports.add_extracategory_post=(req,res)=>{

    extracategory.create({
        categoryid:req.body.categoryid,
        subcategoryid:req.body.subcategoryid,
        extracategory:req.body.extracategory
    }, function(err,extra){

        if(err){
            console.log(err);
        }
        return res.redirect('back')

    })

}

module.exports.view_extracategory= async(req, res)=>{
    let data=await extracategory.find({}).populate('categoryid').populate('subcategoryid').exec();
        return res.render('view_extracategory',{
            data:data,
        })

}
