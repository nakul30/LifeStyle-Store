const { findById } = require('../models/user');
const User = require('../models/user');
const Product = require('../models/product') ; 

module.exports.homeload = function (req, res) {
    res.render('home', {
        title: "Home"
    })
}
module.exports.listload = function( req , res ){
    res.render('list',{
        title :"LIST || PRODUCT "
    })
}
// module.exports.createproduct = function( req , res ){
//     // console.log(req.user._id) 
//     let productId ;
//     let pp ;
//     Product.uploadedPimage(req, res, function (err) {
//         if (err) (console.log('*****MulterERror', err));
//         Product.create({
//             pname: req.body.pname ,
//             pprice : req.body.pprice ,
//             puser : req.user
//         })
//         .then((createdProduct) => {
//              productId = createdProduct._id;
//             console.log('Created product ID:', productId);
//             pp = Product.findById(toString(productId)) ;
            
//             pp.pimg = Product.productPath + '/' + req.file.filename ;
        
//           })
//         .catch((error) => {
//             console.error(error);
//         });
//         console.log(productId) ;
//     })
//     return res.redirect('back') ;
// }
module.exports.createproduct = function (req, res) {
    Product.uploadedPimage(req, res, function (err) {
      if (err) {
        console.log('*****MulterERror', err);
        return res.redirect('back');
      }
      Product.create({
        pname: req.body.pname,
        pprice: req.body.pprice,
        puser: req.user
      })
        .then((createdProduct) => {
          const productId = createdProduct._id;
        //   console.log('Created product ID:', productId);
          const pp = Product.findByIdAndUpdate(productId, {
            pimg: Product.productPath + '/' + req.file.filename
          });
          return pp;
        })
        .then((updatedProduct) => {
        //   console.log('Updated product:', updatedProduct);
          return res.redirect('back');
        })
        .catch((error) => {
          console.error(error);
          return res.redirect('back');
        });
    });
  };
  