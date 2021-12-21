'use strict';

const server = require('server');



server.extend(module.superModule);



server.replace('Subscribe', function (req, res, next) {

    const Resource = require('dw/web/Resource');

    const newsletterForm = server.forms.getForm('newsletter');

    const formErrors = require('*/cartridge/scripts/formErrors');

    const hooksHelper = require('*/cartridge/scripts/helpers/hooks');



    res.json({

        success: false,

        fields: formErrors.getFormErrors(newsletterForm),

        msg: Resource.msg(

            newsletterForm.firstName.valid ? 'subscribe.email.invalid' : 'error.firstname.reqired.to.subscribe.to.additional.list', 'forms', null

        )

    });



    if (newsletterForm.valid) {

        hooksHelper('app.mailingList.subscribe', 'subscribe', [newsletterForm.email.value], function () {});

        res.json({

            success: true,

            msg: Resource.msg('subscribe.email.success', 'homePage', null)

        });

        return next();

    }

    return next();

});

module.exports = server.exports();
