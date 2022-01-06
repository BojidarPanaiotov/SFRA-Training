'use strict';

var server = require('server');

//Testing Custom Objects
server.get('Test', function (req, res, next) {
    var Transaction = require('dw/system/Transaction');

    Transaction.wrap(function () {
        var customObj = dw.object.CustomObjectMgr.
        getCustomObject('test_demo_object', '_1');

        customObj.custom.demoObject = '_9190';
        customObj.custom.demo = 'Error 0102_2035_2130_9912';
    });

    res.render('test');

    next();
});

//Testing AJAX Post Request
server.get('Ajax', function (req, res, next) {
    
    res.json({
        value: '<h1>This is embedded from via AJAX call to a Test Controller</h1>'
    });

    next();
});

//AJAX Where The Request Is Fired
server.get('LoadAjax', function (req, res, next) {
    res.render('testAjax');

    next();
});
module.exports = server.exports();
