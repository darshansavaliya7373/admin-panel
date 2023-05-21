var path = require('path');
var fs = require('fs');
const category = require('../models/category');


module.exports.add_category = function(req,res){
      
        return res.render('add_category') 
}

module.exports.add_category_post = function(req,res){
    console.log(req.body);
    category.create({
        category :req.body.category,
    }, function(err){
        if(err)
        {
            console.log(err);
            return false;
        }
    });
    req.flash('success','category added successfully')
    return res.redirect('add_category')
}

module.exports.view_category=(req,res)=>{
    category.find({}, function(err, record){
        if(err)
        {
            console.log(err);
            return false;
        }
    return res.render('view_category',
    {
       data : record
   });
    
})
}


module.exports.deletecategory=(req,res)=>{

   category.findById(req.params.id, function(err, record){

    if(err){
        console.log(err);
    }
    if(record){

        category.findByIdAndDelete(req.params.id, function(err, record){

            if(err){
                console.log(err);
            }
            return res.redirect('back')

        })

    }

   })

}




module.exports.updatecategory=(req,res)=>{

    category.findById(req.params.id,function(err,record){

        if(err){
            console.log(err);
        }
        if(record){
        return res.render('categoryupdate',{

            data:record

        })
    }
    })

}


module.exports.categoryupdate=(req,res)=>{

category.findById(req.body.Id, function(err, data){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log(req.body.id);
   
   
   category.findByIdAndUpdate(req.body.id, {
        category : req.body.category,
       
    }, function(err){
        if(err)
        {
            console.log(err);
            return false;
        }
        req.flash('success','data updated successfully');
        return res.redirect('/category/view_category');
    });
});

}