'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context) {
    var model = new HashMap();

    var page = context.page;
    model.page = page;
    model.content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    return new Template('experience/pages/homepage').render(model).text;
};
