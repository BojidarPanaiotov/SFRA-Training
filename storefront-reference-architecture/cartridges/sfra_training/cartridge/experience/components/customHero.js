'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.title = content.title?content.title:content.product.name;
    model.bg_image = content.bg_image.file.url;
    model.short_desc = content.short_desc;
    model.cta = content.cta?content.cta:'View More';
    model.product = content.product;

    return new Template('experience/components/customHero').render(model).text;
};
