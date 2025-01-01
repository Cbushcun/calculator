/** Restart
 * var activeExpression = ""; use regex to allow building expression, use ÷ instead of / and x instead of *
 * buildExpression function to use buttons to build string
 * update screen with string on button press
 * Percent calculation should multiply the decimal form by the result to percent e.g. 5+5% is 5+(5*0.05) whereas 5*5% is just 5*0.05
 * Use regex to tokenize expression to allow following of pemdas, if % symbol is found, convert it to desired number based on last numerical token
 */

let activeExpression = "";
const displayRegex = /(\d+|\+|\-|\*|\/|\%)/g;

document.addEventListener("DOMContentLoaded", function () {
	const display = document.getElementById("display");
	const buttons = document.querySelectorAll("button");

	// Button listener, allows for button input
	buttons.forEach((button) => {
		button.addEventListener("click", (btn) => {
			if (btn.target.innerText === "AC") {
				clearDisplay();
			} else {
				appendChar(btn.target.innerText);
				console.log(btn.target.innerText);
			}
		});
	});

	// Keyboard listener, allows numerical input via keystrokes
	window.addEventListener("keydown", function (keystroke) {
		keystroke.preventDefault();
		if (keystroke.key.match(displayRegex)) {
			appendChar(keystroke.key);
		} else if (keystroke.key === "Backspace") {
			clearLastInput();
			activeExpression = display.value;
		}
	});
});

function appendChar(char) {
	activeExpression += char;
	updateDisplay();
}

function tokenizeExpression(expression) {
	return expression.match(displayRegex);
}

function updateDisplay() {
	const display = document.getElementById("display");
	display.value = activeExpression;
}

function clearDisplay() {
	const display = document.getElementById("display");
	display.value = "";
}

function clearLastInput() {
	const display = document.getElementById("display");
	display.value = display.value.slice(0, -1);
}
