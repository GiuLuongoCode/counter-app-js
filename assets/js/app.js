//This is the main script to manage the counter

function createElemetHtml(elementType, params) {
  let element;
  if (elementType == "svg") {
    element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      elementType
    );
  } else {
    element = document.createElement(elementType);
  }
  if (params.classList != undefined) {
    element.classList.add(params.classList);
  }

  for (attribute in params.attributes) {
    element.setAttribute(attribute, params.attributes[attribute]);
  }
  if (params.value != undefined) {
    element.value = params.value;
  }
  if (Array.isArray(params.childs)) {
    params.childs.forEach((child) => {
      element.appendChild(child);
    });
  } else if (params.childs instanceof Node) {
    element.appendChild(params.childs);
  }

  return element;
}

// TODO: refactor createButton
function createButton(id, pathImage) {
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
  const idElement = element.getAttribute("id");
  const currentIncrease = parseInt(incrementBy.textContent);
  let currentCount = text === value ? count : countIncrementBy;

  switch (idElement) {
    case "minus":
      currentCount -= currentIncrease;
      break;
    case "add":
      currentCount += currentIncrease;
      break;
    case "reset":
      currentCount = 0;
      break;
    case "minusIncrement":
      if (currentCount > 1) {
        currentCount -= 1;
      }
      break;
    case "addIncrement":
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

const containerTitle = createElemetHtml("div", {
  classList: "container-title",
  childs: createElemetHtml("span", {
    childs: createElemetHtml("h1", {
      childs: document.createTextNode("Counter"),
    }),
  }),
});
const title = createElemetHtml("div", {
  classList: "title-2",
  childs: createElemetHtml("h2", {
    attributes: {
      id: "value",
    },
    childs: document.createTextNode("0"),
  }),
});

const sectionBgStars = createElemetHtml("section", {
  classList: "bg-stars",
  childs:
    [
      createElemetHtml("span", {
        classList: "star",
      }),
    ] * 4,
});

const quantityDiv = document.querySelector(".quantity");

const btnGroup = createElemetHtml("div", {
  classList: "btn-group",
  attributes: {
    role: "group",
    "aria-label": "Basic example",
    id: "btn-group",
  },
});

const container = createElemetHtml("div", {
  classList: "container",
  childs: [containerTitle, title, sectionBgStars, quantityDiv, btnGroup],
});

document.body.appendChild(container);
createButton("reset", "assets/img/rotate-ccw.svg");
createButton("minus", "assets/img/minus.svg");
createButton("add", "assets/img/plus.svg");

let count = 0;
let countIncrementBy = 1;
const value = document.querySelector("#value");
const incrementBy = document.querySelector("#incrementLabel");

quantityDiv.addEventListener("click", (event) => {
  console.log(incrementBy.textContent);
  if (event.target.tagName != "BUTTON") {
    if (event.target.tagName === "SVG") {
      changeCountValue(event.target.parentNode, incrementBy);
    } else if (event.target.tagName === "path") {
      changeCountValue(event.target.parentNode.parentNode, incrementBy);
    }
    return;
  }

  changeCountValue(event.target, incrementBy);
});

btnGroup.addEventListener("click", (event) => {
  if (event.target.tagName === "DIV") {
    let id = event.target.getAttribute("id");
    if (id == "circle" || id == "stars") {
      let parentElement = event.target.parentNode.parentNode;
      changeCountValue(parentElement, value);
    } else {
      changeCountValue(event.target.parentNode, value);
    }

    return;
  }
  changeCountValue(event.target, value);
});
