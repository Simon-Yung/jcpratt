function resize(className,scale) {

	//i could have remade this toonly set flex basis and a width 
	//and just call resize last line to resize flex growth

	items = document.getElementsByClassName(className);
	for (i = 0; i < items.length ; i++) {
		let ratio = (items[i].naturalWidth * scale / items[i].naturalHeight);
		let flexBasis = ratio + 'px';
		items[i].style.width = flexBasis; //because google won't behave
		items[i].style.flex = flexBasis;
		items[i].style.flexGrow = ratio;
		items[i].style.flexShrink = '0';
	};
  
}

var items;
const scalingRatio = Number( document.getElementById('gallery').dataset.scalingRatio );
window.onload = function(event){
	resize('preview', scalingRatio);
};

