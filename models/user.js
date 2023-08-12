const mongoose = require('mongoose');
const multer = require('multer') ; 
const path = require('path') ; 
const AVATAR_PATH = path.join('/uploads/users/avatars') ; 
const userschema = new mongoose.Schema({
    email:{
        type: String,
        required: true ,
        unique: true
    },
    password:{
        type : String,
        require: true
    },
    name:{
        type: String,
        required :true
    },
    avatar :{
        type: String,
         
    } ,
    contact:{
        type: String , 
        // required:true 
    },
    address: { 
        type : String , 
        // required : true 
    },
    products : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'Product'
        }
    ]
}, {timestamps: true 
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname , '..'  , AVATAR_PATH)) ; 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.fieldname + '-' + Date.now()) ;
    }
  });

//static funcinto here for the user ther can bu meultiple other wasys 

userschema.statics.uploadedAvatar = multer({ storage : storage}).single('avatar') ;
userschema.statics.avatarPath = AVATAR_PATH ; 
console.log(userschema.statics.avatarPath) ; 


// now write controler code 

const User  = mongoose.model('User' , userschema);
module.exports = User ;