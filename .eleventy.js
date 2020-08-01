const fg = require('fast-glob');

function searchByGlob(glob){
    //this function DOES NOT return the initial / slash 
    // YOU NEED to add it in the layout file
    let resultArray = fg.sync(glob);
    return resultArray;
}

module.exports = function(eleventyConfig) {

    // Filter source file names using a glob
    //eleventyConfig.addCollection("urbain", function(collectionApi) {
    //    return collectionApi.getFilteredByGlob(["img/urbain/thumbnails/*.jpg" , "img/urbain/thumbnails/*.jpeg"]);
    //});
    
    eleventyConfig.addCollection("urbain", function(collectionApi) {
        const urbain = searchByGlob("img/urbain/thumbnails/*.???");
        return urbain;
    });

    //pass through copy for css javascript and internal images
    eleventyConfig.addPassthroughCopy({ "_includes/assets": "includes/assets" });
    eleventyConfig.addPassthroughCopy({ "img": "img" });

};