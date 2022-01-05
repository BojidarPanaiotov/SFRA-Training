'use strict';

var server = require('server');

server.get('Fact', function (req, res, next) {
    var catService = require('*/cartridge/scripts/catService');
    var response = catService.getCatFact();
    
    res.render('deathStar',{
        catFact: response.fact,
        messageLength: response.length
    }); 

    next();
});

module.exports = server.exports();
