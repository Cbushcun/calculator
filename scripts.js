/** Restart
 * var activeExpression = ""; use regex to allow building expression, use ÷ instead of / and x instead of *
 * buildExpression function to use buttons to build string
 * update screen with string on button press
 * Percent calculation should multiply the decimal form by the result to percent e.g. 5+5% is 5+(5*0.05) whereas 5*5% is just 5*0.05
 * Use regex to tokenize expression to allow following of pemdas, if % symbol is found, convert it to desired number based on last numerical token
 */

let activeExpression = "";
const displayRegex = /[\d%÷x\-+]/;
const symbolRegex = /[%÷x\-+]/;
const tokenRegex = /\d+|[%÷x\-+]/g;

document.addEventListener("DOMContentLoaded", function () {
	const display = document.getElementById("display");
	const buttons = document.querySelectorAll("button");

	// Button listener, allows numerical input via button clicks
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

	// Keyboard listener, allows numerical input via keyboard
	window.addEventListener("keydown", function (keystroke) {
		let timer = 0;
		let interval = null;
		keystroke.preventDefault();
		if (keystroke.key.match(displayRegex)) {
			let charInput = keystroke.key;
			switch (charInput) {
				case "/":
					charInput = "÷";
					break;
				case "*":
					charInput = "x";
					break;
				default:
					break;
			}
			appendChar(charInput);
		} else if (keystroke.key === "Backspace") {
			let isHeld = false;
			let timeoutId = null;

			timeoutId = setTimeout(() => {
				isHeld = true;
				clearDisplay();
			}, 1000);

			const onKeyUp = (event) => {
				if (event.key === "Backspace") {
					clearTimeout(timeoutId);

					if (!isHeld) {
						clearLastInput();
						activeExpression = display.value;
					}
					this.document.removeEventListener("keyup", onKeyUp);
				}
			};
			this.document.addEventListener("keyup", onKeyUp);
		}
	});
});

/**
 * @param {string} char
 * @returns {void}
 * @description Appends a character to the active expression
 */
function appendChar(char) {
	if (activeExpression) {
		let lastChar = getLastToken();
		symbolRegex.test(lastChar) && symbolRegex.test(char)
			? (activeExpression = activeExpression.slice(0, -1) + char)
			: (activeExpression += char);
	} else {
		activeExpression += char;
	}
	updateDisplay();
}

/**
 * @returns {string}
 * @description Returns the last token in the active expression
 */
function getLastToken() {
	let tokenizedExpression = tokenizeExpression(activeExpression);
	return tokenizedExpression[tokenizedExpression.length - 1];
}

/**
 * @param {string} expression
 * @returns {string[]}
 * @description Tokenizes the expression using the tokenRegex
 */
function tokenizeExpression(expression) {
	return expression.match(tokenRegex);
}

/**
 * @description Updates the display with the active expression
 */
function updateDisplay() {
	const display = document.getElementById("display");
	display.value = activeExpression;
}

/**
 * @description Clears the display
 */
function clearDisplay() {
	activeExpression = "";
	updateDisplay();
}

/**
 * @description Clears the last input
 */
function clearLastInput() {
	const display = document.getElementById("display");
	display.value = display.value.slice(0, -1);
}
