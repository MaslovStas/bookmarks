const siteUrl = '//127.0.0.1:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 150;
const minHeight = 150;
// load CSS
let head = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random() * 9999999999999999);
head.appendChild(link);
// load HTML
let body = document.getElementsByTagName('body')[0];
const boxHTML = `
	<div id="bookmarklet">
	<a href="#" id="close">&times;</a>
	<h1>Select an image to bookmark:</h1>
	<div class="images"></div>
	</div>`;
body.innerHTML += boxHTML;

function bookmarkletLaunch() {
	let bookmarklet = document.getElementById('bookmarklet');
	let imagesFound = bookmarklet.querySelector('.images');
	// clear images found
	imagesFound.innerHTML = '';
	bookmarklet.style.display = 'block';
	// close event
	bookmarklet.querySelector('#close').addEventListener('click', function () {
		bookmarklet.style.display = 'none';
	});
	let images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
	console.log(images)
	images.forEach(image => {
		if (image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
			let imageFound = document.createElement('img');
			imageFound.src = image.src;
			imagesFound.append(imageFound);
		}
	})
	// select image event
	imagesFound.querySelectorAll('img').forEach(image => {
		image.addEventListener('click', function(event){
			let imageSelected = event.target;
			bookmarklet.style.display = 'none';
			window.open(siteUrl + 'images/create/?url='
									+ encodeURIComponent(imageSelected.src)
									+ '&title='
									+ encodeURIComponent(document.title),
									'_blank')
		})
	})
}

bookmarkletLaunch();
