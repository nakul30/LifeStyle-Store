const User = require('../models/user');
const Product = require('../models/product');
module.exports.listload = function (req, res) {
    res.render('list', {
        title: "LIST || PRODUCT "
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
            .then((updatedUser) => {
                console.log(updatedUser);
                return res.redirect('back');
            })
            .catch((error) => {
                console.error(error);
                return res.redirect('back');
            });
    });
};

