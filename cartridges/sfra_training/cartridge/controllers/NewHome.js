'use strict';

var server = require('server');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.get('Show', function (req, res, next) {

    res.render('newHomepage');

    next();
});

server.get('ListCategories', function (req, res, next) {

    var womensCategory = CatalogMgr.getCategory('womens').subCategories;
    var mensCategory = CatalogMgr.getCategory('mens-clothing').subCategories;

    var womensResult = [];
    var mensResult = [];

    for (let index = 0; index < womensCategory.length; index++) {
        var data = {
            name: womensCategory[index].displayName,
            description: womensCategory[index].pageDescription,
            image: womensCategory[index].custom.slotBannerImage.httpsURL
        };

        womensResult.push(data);
    }

    for (let index = 0; index < mensCategory.length; index++) {
        var data = {
            name: mensCategory[index].displayName,
            description: mensCategory[index].pageDescription,
            image: mensCategory[index].custom.slotBannerImage.httpsURL
        };

        mensResult.push(data);
    }
    
    res.render('listCategories', {
        womensResult: womensResult,
        mensResult: mensResult,
    });

    next();
});

server.get('Featured', function (req, res, next) {

    res.render('featuredProducts');

    next();
});

module.exports = server.exports();
