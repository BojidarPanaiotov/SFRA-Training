'use strict';

var server = require('server');
var CatalogMgr = require('dw/catalog/CatalogMgr');

server.get('Show', function (req, res, next) {

    res.render('newHomepage'); 

    next();
});

server.get('ListCategories', function (req, res, next) {
    
    res.render('listCategories');

    next();
});

server.get('Featured', function (req, res, next) {

    res.render('featuredProducts');

    next();
});

module.exports = server.exports();
