'use strict'

function ProcessSuggestionProductsAsset(contentAssetName) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var ContentMgr = require('dw/content/ContentMgr');

    // Getting the content asset (Products ids separated with commas)
    var content = ContentMgr.getContent('suggest_products_email');

    var htmlContentLines = content.custom.body.markup.split('\n');

    var htmlHeader = htmlContentLines[0];
    var htmlFooter = htmlContentLines[htmlContentLines.length - 1];

    // Array with actual products
    var data = [{
            htmlHeader: htmlHeader,
            htmlFooter: htmlFooter
        },
        {
            productData: []
        },
        {
            content: content
        }
    ];

    // The loop is starting from 1 to becouse the first line is the HTML header
    for (let index = 1; index < htmlContentLines.length - 1; index++) {
        // Getting the ID of the product
        var productId = (htmlContentLines[index].split('=')[1]).trim();
        var currPorduct = ProductMgr.getProduct(productId);

        data[1].productData.push(currPorduct);
    }

    return data;
}

module.exports = {
    ProcessSuggestionProductsAsset: ProcessSuggestionProductsAsset
};