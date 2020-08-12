
// Get the modal gallery by id
const numberOfImage = document.getElementsByClassName('preview').length;
var currentImage;
var modalIsOpen = false;

const modal = document.getElementById('modal_window');

const imageContainer = document.getElementById('modal_image_container');
const image = document.getElementById('modal_image');

const purchaseLink = document.getElementById('purchase_link');
const previous = document.getElementById('previous');
const pagination = document.getElementById('pagination');
const next = document.getElementById('next');
const closeButton = document.getElementById('close');

const menu = document.getElementById("contextual_menu");
const menu_next = document.getElementById('menu_next');
const menu_previous = document.getElementById('menu_previous');
const menu_close = document.getElementById('menu_close');
var menuIsVisible = false;

//fake loader
const loader = document.getElementById('spinner');
function spinIt() {
	loader.style.height = "100%";
	loader.classList.add('spinning');
	loader.onanimationend = () => {
		loader.classList.remove('spinning');
		loader.style.height = "0px";
	};
}

// Modal

function openModalGallery(imageIDNumber) {
	//looking back , i could have just used an array instead of this id system, oh well...
	modalIsOpen = true;
	//check if image id is within bound, wrap around if not
	imageIDNumber = parseInt(imageIDNumber);
	if ( imageIDNumber == 0 ) { imageIDNumber = numberOfImage; }
	if ( imageIDNumber > numberOfImage ) { imageIDNumber = 1; }
	let img;
	img = document.getElementById(imageIDNumber);
	//animate the preview when clicked
	img.classList.add("zoom");
	img.onanimationend = () => {
		img.classList.remove("zoom");
	};
	//update the buy button
	if ( img.dataset.externalLink == undefined){
		purchaseLink.style.display = 'none';
	} else{
		purchaseLink.style.display = 'flex';
		purchaseLink.href = img.dataset.externalLink;
	}
	//change image, open the modal
	modal.style.display = "flex";
	pagination.innerHTML = img.dataset.pagination;
	image.src = img.src.replace("/thumbnails", "/larges").replace("/products", "/larges");
	currentImage = imageIDNumber;

	//spinner action
	spinIt();

	document.body.style.overflow = 'hidden';
}

//prev and next
function nextModal(n) {
  currentImage += n;
  openModalGallery(currentImage);
}

//custom right click menu

function hideMenu(){
	if (menuIsVisible){
		menu.style.display = 'none';
		menuIsVisible = false;
	}
};

function showMenu( top, left ){
	menu.style.top = top + 'px';
	menu.style.left = left + 'px';
	menu.style.display = 'flex';
	menuIsVisible = true;
};


// EVENTLISTENER

// FOR THE MENU

addEventListener( 'click' , function(event) {
	hideMenu();
});
addEventListener('contextmenu',function(event){
	if (modalIsOpen){
		let mouseX = event.clientX;
		let mouseY = event.clientY;
		event.preventDefault();
		hideMenu();
		showMenu(mouseY , mouseX);
	}
});

// MENU CONTROLS
menu_previous.addEventListener( 'click' , function(event) {
	nextModal(-1);
});
menu_next.addEventListener( 'click' , function(event) {
	nextModal(+1);
});
menu_close.addEventListener( 'click' , function(event) {
	modal.style.display = "none";
	modalIsOpen = false;
	document.body.style.removeProperty('overflow');
});

// MODAL CONTROLS

closeButton.addEventListener("click", function(){
	modal.style.display = "none";
	modalIsOpen = false;document.body.style.removeProperty('overflow');

}); 
previous.addEventListener("click", function(){
	  nextModal(-1);
}); 
next.addEventListener("click", function(){
	  nextModal(+1);
}); 
imageContainer.addEventListener("click", function(){
	if (!menuIsVisible){
		modal.style.display = "none";
		modalIsOpen = false;
		document.body.style.removeProperty('overflow');
	}
}); 

//update buy text

function fuck() {
	var currentBuyText = document.getElementById('buy_link_text');
	var correctedBuyText = document.getElementById('gallery').dataset.buyText;
	currentBuyText.innerHTML = correctedBuyText;
}

window.onload = fuck();