const User = require('../models/user');
const Product = require('../models/product');
const { findById } = require('../models/user');

module.exports.homeload = function (req, res) {
    res.render('home', {
        title: "Home"
    })
}
