const mongoose = require('mongoose');
const multer = require('multer') ; 
const path = require('path') ; 
const PRODUCT_PATH = path.join('/uploads/products') ; 
const productschema = new mongoose.Schema({
    pname:{
        type: String,
        required :true
    },
    pimg :{
        type: String,
        // required : true 
    } ,
    puser :{
        type:  mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required:true 
    },
    pprice: { 
        type : String , 
        required : true
    }
}, {timestamps: true 
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname , '..'  , PRODUCT_PATH)) ; 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.fieldname + '-' + Date.now()) ;
    }
  });

//static funcinto here for the user ther can bu meultiple other wasys 

productschema.statics.uploadedPimage = multer({ storage : storage}).single('pimg') ;
productschema.statics.productPath = PRODUCT_PATH ; 
// console.log(productschema.statics.productPath) ; 


// now write controler code 

const Product  = mongoose.model('Product' , productschema );
module.exports = Product ;