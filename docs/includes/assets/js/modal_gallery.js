
// Get the modal gallery by id

const modal = document.getElementById('modal_window');
const image = document.getElementById('modal_image');
const pagination = document.getElementById('pagination');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const closeButton = document.getElementById('close');
const purchaseLink = document.getElementById('purchase_link');
const numberOfImage = document.getElementsByClassName('preview').length;
var currentImage ;

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
    //check if image id is within bound, wrap around if not
    imageIDNumber = parseInt(imageIDNumber);
    if ( imageIDNumber == 0 ) { imageIDNumber = numberOfImage; }
    if ( imageIDNumber > numberOfImage ) { imageIDNumber = 1; }
    let img;
    img = document.getElementById(imageIDNumber);
    //animated the preview when clicked
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
    image.src = img.src.replace("/thumbnails", "/larges");
    currentImage = imageIDNumber;

    //spinner action
    spinIt();
}

//prev and next


function nextModal(n) {
  currentImage += n;
  openModalGallery(currentImage);
}

// Get the element that change the modal
closeButton.addEventListener("click", function(){
  modal.style.display = "none";
}); 
image.addEventListener("click", function(){
  modal.style.display = "none";
}); 
previous.addEventListener("click", function(){
    nextModal(-1);
}); 
next.addEventListener("click", function(){
    nextModal(+1);
}); 

//disable rightclick menu
image.addEventListener("contextmenu", e => {
  e.preventDefault();
});

modal.addEventListener("contextmenu", e => {
  e.preventDefault();
});
