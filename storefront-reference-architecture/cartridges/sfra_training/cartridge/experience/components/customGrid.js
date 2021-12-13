'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context) {
    //The model which we need in the isml template
    var model = new HashMap();

    //Input fields information, which the merchant has filled 
    var content = context.content;
    //Component meta information 
    var component = context.component;
    //All the regions extracted from the definition in the customGrid JSON file
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    //Get total iterations, to calculate how many elements we need to display
    var iterations = content.rows_count * content.cols_count;

    //Array which we need in the isml to display only the amount of elements we need (with isloop tag)
    var iterationsArray = [];

    //We start from 1 and iterating until we hit iterations variable
    for (let index = 1; index <= iterations; index++) {
        /*
            For each element we are appending 
            element plus it's index 
            (we make this becouse of the regions defined in the json meta file)
        */
        iterationsArray.push("element"+index);
    }

    //Processing the class for the elements 
    var colClass = "col-"+(12 / Number(content.cols_count)) + " bg-primary";

    //Passing the class to the model
    model.colClass = colClass;
    //Passing the array to the model 
    model.iterationsArray = iterationsArray;

    return new Template('experience/components/customGrid').render(model).text;
};
