'use strict';

const $ = window.$;

const scrollAnimate = require('base/components/scrollAnimate');

const formValidation = require('base/components/formValidation');



let emailSignupT = null;



function displayMessage(data, $form) {

    const $button = $form.find('.js-submit-btn');

    let status = data.success ? 'alert-success' : 'alert-danger';

    let $emailSignupMsg = $('.email-signup-message');



    $.spinner().stop();



    if (!$emailSignupMsg.length) {

        $('body').append('<div class="email-signup-message"></div>');

        $emailSignupMsg = $('.email-signup-message');

    }



    $emailSignupMsg.html('<div class="email-signup-alert text-center ' + status + '">' + data.msg + '</div>');



    clearTimeout(emailSignupT);

    emailSignupT = setTimeout(function () {

        $emailSignupMsg.remove();

        $button.removeAttr('disabled');

    }, 3000);

}



module.exports = function () {

    $('.js-newsletter-form').on('submit', function (e) {

        e.preventDefault();

        $.spinner().start();

        const $form = $(this);

        const $submitBtn = $form.find('.js-submit-btn');



        $submitBtn.attr('disabled', true);



        $.ajax({

            url: $form.attr('action'),

            type: $form.attr('method'),

            data: $form.serialize(),

            success: function (data) {

                formValidation($form, data);

                displayMessage(data, $form);

            },

            error: function (err) {

                formValidation($form, err);

                displayMessage(err, $form);

            }

        });

    });



    $('.back-to-top').on('click', scrollAnimate);

};
