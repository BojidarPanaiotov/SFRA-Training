'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get('Show',csrfProtection.generateToken, function (req, res, next) {

    var addressForm = server.forms.getForm('address');
    addressForm.clear();

    res.render('account/editAddAddress',{
        addressForm: addressForm
    }); 

    next();
});

server.get('GetBussinesForm',csrfProtection.generateToken, function (req, res, next) {

    var bussinesAddress = server.forms.getForm('bussinesAddress');
    bussinesAddress.clear();

    res.render('account/bussinesAddress',{
        addressForm: bussinesAddress,
        addressId: 'bussinesAddress'
    }); 

    next();
});

server.get('GetPrivateForm',csrfProtection.generateToken, function (req, res, next) {

    var privateAddress = server.forms.getForm('privateAddress');
    privateAddress.clear();
    res.render('account/privateAddress',{
        addressForm: privateAddress,
        addressId: 'privateAddress'
    }); 

    next();
});
module.exports = server.exports();
