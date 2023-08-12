const { findById } = require('../models/user');
const User = require('../models/user');
const Product = require('../models/product');

module.exports.homeload = function (req, res) {
  Product.find({}).populate('puser').exec()
  .then(products =>{
    res.render('home' , {
      title:"HOME" , 
      productsby : products
    })
  })
}
// we only have user id if we dont prepopulate product with user

module.exports.success = function( req , res ){
  res.render('success' ,{
    title: 'success'
  })
}