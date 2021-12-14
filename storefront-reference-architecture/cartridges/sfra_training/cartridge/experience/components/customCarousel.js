'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var component = context.component;
    
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/customCarousel').render(model).text;
};

//Create featured products component which should be a carousel with slides. Each slide to be a product tile component. The carousel component should have a configurable title. For the product tile use the existing SFRA component.

// 25686395M