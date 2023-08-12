const User = require('../models/user');
const Product = require('../models/product');
const productsMailer = require('../mailers/productsmailer');
module.exports.listload = function (req, res) {
    User.findById(req.user.id)
    .populate({
        path: 'products'
    })
    .exec()
    .then((user)=>{
        return res.render('list' , {
            title : "LIST || product" , 
            all_users : user 
        })
    })
    .catch((err)=> 
    {
        console.log("EROR COFF ") ;
    })
}

module.exports.createproduct = function (req, res) {
    let pid;
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
                pid = productId;
                const pp = Product.findByIdAndUpdate(productId, {
                    pimg: Product.productPath + '/' + req.file.filename
                });
                return pp;
            })
            .then((updatedProduct) => {
                return User.findByIdAndUpdate(
                    req.user._id,
                    { $push: { products: pid } },
                    { new: true }
                );
            })
            // .then((updatedUser) => {
            //     console.log(updatedUser);
            //     return res.redirect('back');
            // })
            .then((updatedUser) => {
              
              return Product.findById(pid).populate('puser'); // Populate the 'puser' field with user information

            })
            .then((populatedProduct) => {
              console.log(populatedProduct);
              productsMailer.newProduct(populatedProduct) ;
              return res.redirect('back');
            })
            .catch((error) => {
                console.error(error);
                return res.redirect('back');
            });
    });
};

module.exports.destroy= function( req , res ){
    Product.findById(req.params.id)
    .exec()
    .then(product  => {
      if (product.puser == req.user.id) {
        let userId = product.puser;
  
        product.deleteOne()
          .then(() => {
            return User.findByIdAndUpdate(
              userId,
              { $pull: { products : req.params.id } },
              { new: true }
            ).exec();
          })
          .then(() => {
            return res.redirect('back');
          })
          .catch(err => {
            // Handle any error that occurred during post update
            console.error("Error updating user:", err);
            return res.redirect('back');
          });
      } else {
        return res.redirect('back');
      }
    })
    .catch(err => {
      // Handle any error that occurred during comment retrieval
      console.error("Error finding product:", err);
      return res.redirect('back');
    });
  
  }

