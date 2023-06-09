//This is the main script to manage the counter 

console.log("CIAO! QUESTO è counter");
let count = 0;
let add = document.querySelector("#add");
let btnDecrease = document.getElementById('minus');
let value = document.querySelector("#value");

add.addEventListener("click", function () {
		count += 1;
		value.textContent = count;
	});

btnDecrease.addEventListener("click", function () {
	count -= 1;
	value.textContent = count;
});
