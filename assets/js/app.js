//This is the main script to manage the counter

function createElemetHtml(elementType, params) {
  let element;
  if (elementType == "svg" || elementType == "image") {
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

function createButton(typeButton) {
  let pathImage;
  if (typeButton === "reset") {
    pathImage = "rotate-ccw";
  } else if (typeButton === "add") {
    pathImage = "plus";
  } else {
    pathImage = typeButton;
  }

  const svg = createElemetHtml("svg", {
    attributes: {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
    },
    childs: createElemetHtml("image", {
      attributes: {
        href: "assets/img/".concat(pathImage.concat(".svg")),
        width: "24",
        height: "24",
        fill: "currentColor",
      },
    }),
  });

  const button = createElemetHtml("button", {
    attributes: {
      type: "button",
      id: typeButton,
      title: typeButton,
    },
    classList: "btn",
    childs: [
      svg,
      createElemetHtml("div", {
        attributes: {
          id: "container-stars",
        },
        childs: [
          createElemetHtml("div", {
            attributes: {
              id: "stars",
            },
          }),
        ],
      }),
      createElemetHtml("div", {
        attributes: {
          id: "glow",
        },
        childs:
          [
            createElemetHtml("div", {
              classList: "circle",
            }),
          ] * 2,
      }),
    ],
  });

  return button;
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

const buttonAdd = createButton("add");

const buttonMinus = createButton("minus");

const buttonReset = createButton("reset");

const btnGroup = createElemetHtml("div", {
  classList: "btn-group",
  attributes: {
    role: "group",
    "aria-label": "Basic example",
    id: "btn-group",
  },

  childs: [buttonReset, buttonMinus, buttonAdd],
});

const container = createElemetHtml("div", {
  classList: "container",
  childs: [containerTitle, title, sectionBgStars, quantityDiv, btnGroup],
});

document.body.appendChild(container);

let count = 0;
let countIncrementBy = 1;
const value = document.querySelector("#value");
const incrementBy = document.querySelector("#incrementLabel");

quantityDiv.addEventListener("click", (event) => {
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
