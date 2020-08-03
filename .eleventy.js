const fg = require('fast-glob');

function searchByGlob(glob){
    //this function DOES NOT return the initial / slash 
    // YOU NEED to add it in the layout file
    let resultArray = fg.sync(glob);
    return resultArray;
}

module.exports = function(eleventyConfig) {

    //get every folders in /galleries
    const galleries =  fg.sync('galleries/*', { onlyDirectories: true, deep: 0 });

    //for each of the folder
    galleries.forEach(
        function (value) {

            //create a collection named as the folder 's name
            let title = value.replace('galleries/','');

            eleventyConfig.addCollection( title, function(collectionApi) {

                //get the images in the ''larges'' folder and sort them alphabetically
                let collection = searchByGlob( value + "/thumbnails/*.???");
                collection.sort();

                return collection;
            });
        }

    );
         

    //pass through copy for css javascript and internal images
    eleventyConfig.addPassthroughCopy({ "_includes/assets": "includes/assets" });
    eleventyConfig.addPassthroughCopy({ "galleries": "galleries" });
    eleventyConfig.addPassthroughCopy({ "products": "products" });

};