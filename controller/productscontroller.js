var path = require('path');
var fs = require('fs');
var category = require('../models/category');
const products = require('../models/products');
var subcategory = require('../models/subcategory');
var extracategory = require('../models/extracategory');


module.exports.add_products = (req, res) => {
    category.find({}, function (err, catedata) {
        if (err) {
            console.log(err);
            return false
        }

        return res.render('add_products',
            {
                data: catedata
            })
    })
}

module.exports.subdatas = (req, res) => {
    extracategory.find({ subcategoryid: req.body.subcateid }, function (err, subdata) {
        if (err) {
            console.log(err);
        }
        return res.render('suboptions', {
            'subcatedata': subdata
        });
    })
}

module.exports.add_products_post = (req, res) => {

    console.log(req.body);

    products.uploadAvatar(req, res, function () {

        if (req.file) {
            imgPath = products.avatarpath + "/" + req.file.filename;
        }
        products.create({

            categoryid: req.body.categoryid,
            subcategoryid: req.body.subcategoryid,
            extracategoryid: req.body.extracategoryid,
            pname: req.body.pname,
            price: req.body.price,
            avatar:imgPath

        }, function (err) {
            if (err) {
                console.log(err);
                return false;
            }
        });
        req.flash('success', 'data added successfully');
        return res.redirect('back');
    });

}


module.exports.view_products= async(req, res)=> {



    let data=await products.find({}).populate('categoryid').populate('subcategoryid').populate('extracategoryid').exec();
    let searching='shirts'
    console.log(searching);
    let search=await category.find({category:RegExp(searching)})
    return res.render('view_products',{
        products:data,
        search:search
    })
    
}

module.exports.go=async (req, res)=> {

   console.log(search);
   return res.redirect('view_products',{
   })
}