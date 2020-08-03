function resize(className,scale) {

    items = document.getElementsByClassName(className);
    for (i = 0; i < items.length ; i++) {
        let ratio = ((items[i].naturalWidth / items[i].naturalHeight)* 100  ) *scale
        let flex = "1 0 " + ratio + "px";
        console.log(items[i].naturalWidth +'/'+ items[i].naturalHeight +'|'+ ratio + "px")
        items[i].style.flex = flex ;
    };
  
}

function resizeLastLine() {

    let lastItem = items[items.length - 1].getBoundingClientRect().top;

    for (i = items.length - 1; i > -1; i--) {
        let currItem = items[i].getBoundingClientRect().top;
        if ( lastItem == currItem) {
            items[i].style.flexGrow = "0";
            console.log('true');
        } else{
            items[i].style.flexGrow = "1";
            console.log('false');
        }
    };
}

const scalingRatio = 0.9;
var items;
window.onload = function(event){
    resize('preview', scalingRatio);
    console.log( items );
    resizeLastLine();
};


var myEfficientFn = debounce(function() {

    //actual work goes here vvv
    
        resizeLastLine();
    
    //actual work goes here ^^^
    
    }, 250);
    
    //rebound function vvv
    
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
    
window.addEventListener('resize', myEfficientFn);