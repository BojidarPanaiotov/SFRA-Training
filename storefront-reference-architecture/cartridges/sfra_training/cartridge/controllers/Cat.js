'use strict';

var server = require('server');

server.get('Fact', function (req, res, next) {
    var catService = require('*/cartridge/scripts/catService');
    var response = catService.getCatFact();

    res.render('deathStar', {
        catFact: response.fact,
        messageLength: response.length
    });

    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var UUID = require('dw/util/UUIDUtils');

    Transaction.wrap(function () {
        for (let i = 0; i < 5; i++) {
            var obj = CustomObjectMgr.createCustomObject('test_demo_object', UUID.createUUID());
            obj.custom.demo = 'Deeeeeeemo' + i + 'test';
        }
    });
    
    next();
});

module.exports = server.exports();
