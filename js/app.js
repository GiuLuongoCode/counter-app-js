//This is the main script to manage the counter 

let count = 0;
const add = document.querySelector("#add");
const btnDecrease = document.getElementById('minus');
const value = document.querySelector("#value");
const resetBtn = document.querySelector("#reset");

add.addEventListener("click", function () {
		count += 1;
		value.textContent = count;
	});

btnDecrease.addEventListener("click", function () {
	count -= 1;
	value.textContent = count;
});

resetBtn.addEventListener("click", () => {
	count = 0;
	value.textContent = count;
});