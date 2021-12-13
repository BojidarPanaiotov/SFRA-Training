'use strict';

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var ContentMgr = require('dw/content/ContentMgr');

    var showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);

    var productId = showProductPageHelperResult.product.id;
    var currentProduct = ProductMgr.getProduct(productId);

    var uniqueData = {
        name: currentProduct.name?currentProduct.name:'This product has no name',
        shortDesc: currentProduct.shortDescription.markup?currentProduct.shortDescription.markup:'This product has no description',
        brand: currentProduct.brand?currentProduct.brand:'This product has no brand'
    };

    var uniqueContent = ContentMgr.getContent('unique_product_information');

    res.render('product/productDetails',{
        content: uniqueContent,
        data: uniqueData
    });

    next();
});

module.exports = server.exports();
