'use strict';

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.extend(module.superModule);

server.replace(
    'SubmitRegistration',
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var Site = require('dw/system/Site');

        var formErrors = require('*/cartridge/scripts/formErrors');

        var registrationForm = server.forms.getForm('profile');
        //TEST CODE
        var accountHelper = require('*/cartridge/scripts/helpers/accountHelpers');
        var response = accountHelper.ValidateReCaptchaToken(registrationForm.customer.captachField.htmlValue);


        var reCaptchaThreshold = Site
            .current
            .preferences
            .custom.reCaptchaThreshold;

            if(reCaptchaThreshold > response.score){
                registrationForm.valid = false;
            }
        //TEST CODE
        if (!CustomerMgr.isAcceptablePassword(registrationForm.login.password.value)) {
            registrationForm.login.password.valid = false;
            registrationForm.login.passwordconfirm.error =
                Resource.msg('error.message.password.constraints.not.matched', 'forms', null);
            registrationForm.valid = false;
        }

        // setting variables for the BeforeComplete function
        var registrationFormObj = {
            email: registrationForm.customer.email.value,
            password: registrationForm.login.password.value,
            validForm: registrationForm.valid,
            form: registrationForm
        };

        if (registrationForm.valid) {
            res.setViewData(registrationFormObj);

            this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
                var Transaction = require('dw/system/Transaction');
                var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
                var authenticatedCustomer;
                var serverError;

                // getting variables for the BeforeComplete function
                var registrationForm = res.getViewData(); // eslint-disable-line

                if (registrationForm.validForm) {
                    var login = registrationForm.email;
                    var password = registrationForm.password;

                    // attempt to create a new user and log that user in.
                    try {
                        Transaction.wrap(function () {
                            var error = {};
                            var newCustomer = CustomerMgr.createCustomer(login, password);

                            var authenticateCustomerResult = CustomerMgr.authenticateCustomer(login, password);
                            if (authenticateCustomerResult.status !== 'AUTH_OK') {
                                error = {
                                    authError: true,
                                    status: authenticateCustomerResult.status
                                };
                                throw error;
                            }

                            authenticatedCustomer = CustomerMgr.loginCustomer(authenticateCustomerResult, false);

                            if (!authenticatedCustomer) {
                                error = {
                                    authError: true,
                                    status: authenticateCustomerResult.status
                                };
                                throw error;
                            } else {
                                // assign values to the profile
                                var newCustomerProfile = newCustomer.getProfile();

                                newCustomerProfile.firstName = registrationForm.firstName;
                                newCustomerProfile.lastName = registrationForm.lastName;
                                newCustomerProfile.phoneHome = registrationForm.phone;
                                newCustomerProfile.email = registrationForm.email;
                            }
                        });
                    } catch (e) {
                        if (e.authError) {
                            serverError = true;
                        } else {
                            registrationForm.validForm = false;
                            registrationForm.form.customer.email.valid = false;
                            registrationForm.form.customer.emailconfirm.valid = false;
                            registrationForm.form.customer.email.error =
                                Resource.msg('error.message.username.invalid', 'forms', null);
                        }
                    }
                }

                delete registrationForm.password;
                delete registrationForm.passwordConfirm;
                formErrors.removeFormValues(registrationForm.form);

                if (serverError) {
                    res.setStatusCode(500);
                    res.json({
                        success: false,
                        errorMessage: Resource.msg('error.message.unable.to.create.account', 'login', null)
                    });

                    return;
                }

                if (registrationForm.validForm) {
                    // INJECTED CODE HERE
                    var utilFunctions = require('*/cartridge/scripts/utils/utilFunctions');

                    // Getting content asset and processing the html properly
                    var result = utilFunctions.ProcessSuggestionProductsAsset('suggest_products_email');

                    var data = [result[0], result[1]];
                    var content = result[2].content;

                    accountHelpers.sendCreateAccountEmailCustom(authenticatedCustomer.profile, data, content);
                    // INJECTED CODE HERE
                    res.setViewData({
                        authenticatedCustomer: authenticatedCustomer
                    });
                    res.json({
                        success: true,
                        redirectUrl: accountHelpers.getLoginRedirectURL(req.querystring.rurl, req.session.privacyCache, true)
                    });

                    req.session.privacyCache.set('args', null);
                } else {
                    res.json({
                        fields: formErrors.getFormErrors(registrationForm)
                    });
                }
            });
        } else {
            res.json({
                fields: formErrors.getFormErrors(registrationForm)
            });
        }

        return next();
    }
);

module.exports = server.exports();
