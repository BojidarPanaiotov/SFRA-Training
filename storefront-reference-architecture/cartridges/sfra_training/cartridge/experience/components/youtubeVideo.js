'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    
    model.video_ID = context.content.video_ID;

    return new Template('experience/components/youtubeVideo').render(model).text;
};
