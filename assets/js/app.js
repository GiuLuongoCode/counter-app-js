//This is the main script to manage the counter 
function createButton(id, pathImage){
	const button = document.createElement("button");
	button.classList.add("btn");
	button.setAttribute("type", "button");
	button.setAttribute("id", id);
	button.setAttribute("title", id);

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("height", "24");
	svg.setAttribute("width", "24");

	const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
	image.setAttribute("href", pathImage);
	image.setAttribute("width", "24");
	image.setAttribute("height", "24");
	image.setAttribute("fill", "currentColor");


	svg.appendChild(image);

	const containerStars = document.createElement("div");
	containerStars.setAttribute("id", "container-stars");

	const stars = document.createElement("div");
	stars.setAttribute("id", "stars");
	containerStars.appendChild(stars);

	const glow = document.createElement("div");
	glow.setAttribute("id", "glow");

	const circle1 = document.createElement("div");
	circle1.classList.add("circle");
	const circle2 = document.createElement("div");
	circle2.classList.add("circle");

	glow.appendChild(circle1);
	glow.appendChild(circle2);

	button.appendChild(svg);
	button.appendChild(containerStars);
	button.appendChild(glow);

	const btnGroup = document.querySelector(".btn-group");
	btnGroup.appendChild(button);
}

function changeCountValue(element, text) {
	const idElement = element.getAttribute('id');
	const currentIncrease = parseInt(incrementBy.textContent);
	let currentCount = text === value ? count : countIncrementBy;
  
	switch (idElement) {
	  case 'minus':
		currentCount -= currentIncrease;
		break;
	  case 'add':
		currentCount += currentIncrease;
		break;
	  case 'reset':
		currentCount = 0;
		break;
	  case 'minusIncrement':
		if (currentCount > 1) {
		  currentCount -= 1;
		}
		break;
	  case 'addIncrement':
		currentCount += 1;
		break;
	  default:
		break;
	}
  
	text.textContent = currentCount;
  
	if (text === value) {
	  count = currentCount;
	} else {
	  countIncrementBy = currentCount;
	}
  }
  

createButton("reset", "assets/img/rotate-ccw.svg");
createButton("minus", "assets/img/minus.svg");
createButton("add", "assets/img/plus.svg");

let count = 0;
let countIncrementBy = 1;
const value = document.querySelector("#value");
const incrementBy = document.querySelector("#incrementLabel");

const quantityDiv = document.querySelector('.quantity');
quantityDiv.addEventListener("click", (event) => {
	if (event.target.tagName != 'BUTTON'){
		if (event.target.tagName === 'SVG'){
			changeCountValue(event.target.parentNode, incrementBy);
		}
		else if (event.target.tagName === 'path'){
			changeCountValue(event.target.parentNode.parentNode, incrementBy);
		}
		return;
	}

	changeCountValue(event.target, incrementBy);
})


const btnGroup = document.getElementById('btn-group');
btnGroup.addEventListener("click", (event) => {
	if (event.target.tagName === 'DIV' ){
		let id = event.target.getAttribute('id');
		if (id == 'circle' || id == 'stars') {
			let parentElement = event.target.parentNode.parentNode;
			changeCountValue(parentElement, value);
		}
		else {
			changeCountValue(event.target.parentNode, value);
		}

		return;
	}
	changeCountValue(event.target, value);
});
