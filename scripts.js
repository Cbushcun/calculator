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
	buttons.forEach((button) => {
		button.addEventListener("click", (btn) => {
			appendChar(btn.target.innerText);
			console.log(btn.target.innerText);
		});
	});

	display.addEventListener("input", (display) => {
		const value = display.target.value;
		if (!displayRegex.test(value)) {
			display.target.value = value.slice(0, -1);
		}
	});

	// Keyboard listener, allows numerical input via keystrokes
	window.addEventListener("keydown", function (keystroke) {
		keystroke.preventDefault();
		if (keystroke.key.match(displayRegex)) {
			appendChar(keystroke.key);
		} else if (keystroke.key === "Backspace") {
			display.value = display.value.slice(0, -1);
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
	display = document.getElementById("display");
	display.value = activeExpression;
}
