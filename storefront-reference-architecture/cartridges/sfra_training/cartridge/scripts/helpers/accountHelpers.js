'use strict';

var base = module.superModule;

var URLUtils = require('dw/web/URLUtils');
var endpoints = require('*/cartridge/config/oAuthRenentryRedirectEndpoints');

function sendCreateAccountEmailCustom(registeredUser, productData, content) {
    var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');
    var Site = require('dw/system/Site');
    var Resource = require('dw/web/Resource');

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        url: URLUtils.https('Login-Show'),
        data: productData,
        content: content
    };

    var emailObj = {
        to: registeredUser.email,
        subject: Resource.msg('email.subject.new.registration', 'registration', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@testorganization.com',
        type: emailHelpers.emailTypes.registration
    };

    emailHelpers.sendEmail(emailObj, 'checkout/confirmation/accountRegisteredEmail', userObject);
}

function ValidateReCaptchaToken(token) {
    var Site = require('dw/system/Site');

    var reCaptchaSecretKey = Site
        .current
        .preferences
        .custom.reCaptchaSecretKey;

    var reCaptchaThreshold = Site
        .current
        .preferences
        .custom.reCaptchaThreshold;

    var HTTPClient = require('dw/net/HTTPClient');
    var httpClient = new HTTPClient();
    var url = 'https://www.google.com/recaptcha/api/siteverify?secret=' +
        reCaptchaSecretKey +
        '&response=' +
        token;

    httpClient.open('POST', url);

    httpClient.send();


    return JSON.parse(httpClient.text);
}

base.sendCreateAccountEmailCustom = sendCreateAccountEmailCustom;
base.ValidateReCaptchaToken = ValidateReCaptchaToken;

module.exports = base;
