//This is the main script to manage the counter 

let count = 0;
let countIncrementBy = 2;
const add = document.querySelector("#add");
const btnDecrease = document.getElementById('minus');
const value = document.querySelector("#value");
const resetBtn = document.querySelector("#reset");
const incrementBy = document.querySelector("#incrementLabel");
const addIncrementBtn = document.getElementById("addIncrement");
const minusIncrementBtn = document.getElementById("minusIncrement");

add.addEventListener("click", function () {
		count += parseInt(incrementBy.textContent);
		value.textContent = count;
	});

btnDecrease.addEventListener("click", function () {
	count -= parseInt(incrementBy.textContent);
	value.textContent = count;
});

resetBtn.addEventListener("click", () => {
	count = 0;
	value.textContent = count;
});

addIncrementBtn.addEventListener("click", () => {
	countIncrementBy += 1;
	incrementBy.textContent = countIncrementBy; 
});

minusIncrementBtn.addEventListener("click", () => {
	if (countIncrementBy > 1){
		countIncrementBy -= 1;
		incrementBy.textContent = countIncrementBy; 
	}
});

