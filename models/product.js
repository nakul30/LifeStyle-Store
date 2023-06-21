const mongoose = require('mongoose');
// pridct have photo name and price 

// const multer = require('multer') ; 
// const path = require('path') ; 
// const AVATAR_PATH = path.join('/uploads/users/avatars') ; 
const productschema = new mongoose.Schema({
    name:{
        type: String,
        required: true ,
    },
    price:{
        type : String,
        require: true
    },
    // avatar :{
    //     type: String,
         
    // }
}, {timestamps: true 
});

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null,path.join(__dirname , '..'  , AVATAR_PATH)) ; 
//     },
//     filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //   cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null, file.fieldname + '-' + Date.now()) ;
//     }
//   });

//static funcinto here for the user ther can bu meultiple other wasys 

// userschema.statics.uploadedAvatar = multer({ storage : storage}).single('avatar') ;
// userschema.statics.avatarPath = AVATAR_PATH ; 
// console.log(userschema.statics.avatarPath) ; 


// now write controler code 

const User  = mongoose.model('User' , userschema);
module.exports = User ;