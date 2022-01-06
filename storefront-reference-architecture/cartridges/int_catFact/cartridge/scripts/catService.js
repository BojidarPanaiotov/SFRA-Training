'use strict'

function getCatFact() {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var getFact = dw.svc.LocalServiceRegistry.createService("CatFact", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            
            return args;
        },
        parseResponse: function (svc, client) {
            return client.text;
        },
        filterLogMessage: function(msg){
            return msg+'- have been returned as result';
        },
    });

    var result = getFact.call().object;

    return JSON.parse(result);
}

module.exports = {
    getCatFact: getCatFact
}
