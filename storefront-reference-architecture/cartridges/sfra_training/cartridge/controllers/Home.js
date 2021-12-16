'use strict';

var server = require('server');

server.extend(module.superModule);

server.replace('Show', function (req, res, next) {
    var Site = require('dw/system/Site');
    var PageMgr = require('dw/experience/PageMgr');
    var Site = require('dw/system/Site');

    var pageDesignerTemplate = Site
    .current
    .preferences
    .custom
    .homepageTemplate
    .displayValue;
    
    var page = PageMgr.getPage(pageDesignerTemplate);

    if (page && page.isVisible()) {
        res.page(pageDesignerTemplate);
    } else {
        res.render('home/homePage');
    }
    next();
});

module.exports = server.exports();
