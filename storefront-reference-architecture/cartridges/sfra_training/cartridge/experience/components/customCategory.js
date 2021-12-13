'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.category_title = content.category_title;
    model.category_position = content.category_position;
    model.category_desc = content.category_desc?content.category_desc:content.category_ID.pageDescription;

    return new Template('experience/components/customCategory').render(model).text;
};
