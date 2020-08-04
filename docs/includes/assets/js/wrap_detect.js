function detectWrap(className) {
  
    var wrappedItems = [];
    var prevItem = {};
    var currItem = {};
    var items = document.getElementsByClassName(className);
  
    for (i = items.length; i > 0; i--) {
      currItem = items[i].getBoundingClientRect();
      if (prevItem && prevItem.top == currItem.top) {
        wrappedItems.push(items[i]);
      }
      prevItem = currItem;
    };
    
    return wrappedItems;
  
}
  
window.onload = function(event){
    var wrappedItems = detectWrap('preview');
    console.log(wrappedItems);
    for (var k = 0; k < wrappedItems.length; k++) {
      wrappedItems[k].style.flex = "0 1 auto" ;
    }
};