const Product = require("../models/product");

const cart = [] ;
module.exports.cartpage = function(req , res ){
    res.render('cart' , {
        title : "CART" ,
        cart : cart 
    })
}
// const cart = [] ;
module.exports.addtocart = function(req, res) {
  // Retrieve the product ID from the request parameters
//   const cart = [] ;
  const productId = req.params.id;
  Product.findById(productId)
    .exec()
    .then((product) => {
      cart.push(product);
    //   res.render('cart', { cart: cart });
    return res.redirect('back') ;
    })
    .catch((err) => {
      console.log(err);
    });
};
