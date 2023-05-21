var path = require('path');
var fs = require('fs');
var category = require('../../models/category');
var admin = require('../../models/admin');
var jwt = require("jsonwebtoken");

module.exports.userdata = async (req, res) => {
    let adminrecord = await admin.find({})
    return res.json({ userdata: adminrecord })

}



module.exports.insertapirecord = async (req, res) => {

    var oldrecord = await admin.findOne({ email: req.body.email });

    if (oldrecord) {
        return res.json({ status: 200, message: 'already inserted' })
    }
    else {

        if (req.file) {
            var imgPath = admin.avatarpath + '/' + req.file.filename
            req.body.avatar = imgPath;
            let record = admin.create(req.body)
            if (record) {
                return res.json({ status: 200, message: 'successfully inserted' })
            }
            else {
                return res.json({ status: 200, message: 'not inserted' })

            }
        }
    }

}


module.exports.deleteapirecord = async (req, res) => {

    deleterecord = await admin.findByIdAndDelete(req.params.id);
    if (deleterecord) {

        return res.json({ status: 200, message: 'deleted successfully' })
    }
    else {
        return res.json({ status: 200, message: 'not deleted ' })

    }

}


module.exports.updateapirecord = async (req, res) => {

    var oldrecord = await admin.findById(req.params.id);

    if (oldrecord) {

        fs.unlinkSync(path.join(__dirname, '../../', oldrecord.avatar))

        if (req.file) {
            var imgPath = admin.avatarpath + '/' + req.file.filename;
            req.body.avatar = imgPath
            let record = await admin.findByIdAndUpdate(req.params.id, req.body)
            if (record) {
                return res.json({ status: 200, message: 'data updated successfully' })
            }
            else {
                return res.json({ status: 200, message: 'not updated' })
            }
        }
        else {
            let record = await admin.findByIdAndUpdate(req.params.id, req.body)
            
            if (record) {
                return res.json({ status: 200, message: 'data updated successfully' })
            }
            else{
                return res.json({ status: 200, message: 'not updated' })
            }
        }
    
    }
    else{
        return res.json({ status: 200, message: 'no record found'})
    }

}

module.exports.check_login=async(req,res)=>{

    console.log(req.body.email);
     let admindata = await admin.findOne({email:req.body.email});
     if(!admindata || admindata.password !== req.body.password){
        return res.json({ status: 200, message: 'invalid password or email' })
    }
    else{
        let token =jwt.sign(admindata.toJSON(),'coding',{expiresIn:"10000000"})
         return res.json({ status: 200, message: 'token generated successfully','token':token })

     }

}