const mongoose = require('mongoose');
// pridct have photo name and price 

const multer = require('multer') ; 
const path = require('path') ; 
const User = require('./user');
const PRODUCT_PATH = path.join('/uploads/products') ; 
const productschema = new mongoose.Schema({
    productname:{
        type: String,
        required: true ,
    },
    userofproduct: { 
        type :mongoose.Schema.Types.ObjectId ,
        ref : 'User' , 
        required : true 
    },
    productprice:{
        type : String,
        require: true
    },
    productimg :{
        type: String,
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

productschema.statics.uploadedProduct = multer({ storage : storage}).single('productimg') ;
productschema.statics.productPath = PRODUCT_PATH ; 
// console.log(productschema.statics.productPath) ; 


// now write controler code 

const Product  = mongoose.model('Product' , productschema);
module.exports = Product ;