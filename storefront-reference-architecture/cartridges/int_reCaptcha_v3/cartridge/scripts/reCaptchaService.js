'use strict'

function ValidateReCaptchaToken(token) {
    var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
    var validateTokenService = dw.svc.LocalServiceRegistry.createService("reCAPTCHAv3", {
        
        createRequest: function (svc, args) {
            var Site = require('dw/system/Site');

            var reCaptchaSecretKey = Site
                .current
                .preferences
                .custom.reCaptchaSecretKey;
            
            validateTokenService.URL += '?secret='+reCaptchaSecretKey+'&response='+token;
            
            return args;
        },
        parseResponse: function (svc, client) {
            return client.text;
        },
    });
    
    var result = validateTokenService.call().object;

    return JSON.parse(result);
}

module.exports = {
    ValidateReCaptchaToken: ValidateReCaptchaToken
}
