'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.instagram_url = content.instagram_url;

    return new Template('experience/components/instagramContent').render(model).text;
};
