'use strict'

function getCatFact() {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    var getFact = dw.svc.LocalServiceRegistry.createService("StarWarsDeathStar", {
        createRequest: function (svc, args) {
            svc.setRequestMethod("GET");
            return args;
        },
        parseResponse: function (svc, client) {

            var a = 1;

            return client.text;
        },
        filterLogMessage: function(msg) {
            return msg;
        }
    });
    
    var result = getFact.call().object;

    return JSON.parse(result);
}

module.exports = {
    getCatFact: getCatFact
}
