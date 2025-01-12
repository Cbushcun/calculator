/** Restart
 * var activeExpression = ""; use regex to allow building expression, use ÷ instead of / and x instead of *
 * buildExpression function to use buttons to build string
 * update screen with string on button press
 * Percent calculation should multiply the decimal form by the result to percent e.g. 5+5% is 5+(5*0.05) whereas 5*5% is just 5*0.05
 * Use regex to tokenize expression to allow following of pemdas, if % symbol is found, convert it to desired number based on last numerical token
 */

let activeExpression = "";
const displayRegex = /[\d%÷x\-+]/;
const operatorRegex = /[%÷x\-.+]/;
const tokenRegex = /\d*\.?\d+|[%÷x\-+]/g;

document.addEventListener("DOMContentLoaded", function () {
	const display = document.getElementById("display");
	const buttons = document.querySelectorAll("button");

	// Button listener for numerical input
	buttons.forEach((button) => {
		button.addEventListener("mousedown", (btn) => {
			const { id, innerText } = btn.target;
			if (id === "delete") {
				handleInput(null, true);
			} else {
				handleInput(innerText);
			}
		});
	});

	// Keyboard listener for numerical input
	window.addEventListener("keydown", (keystroke) => {
		keystroke.preventDefault();

		if (keystroke.key.match(displayRegex)) {
			let charInput = keystroke.key;
			if (charInput === "/") charInput = "÷";
			if (charInput === "*") charInput = "x";
			handleInput(charInput);
		} else if (keystroke.key === "Backspace") {
			handleInput(null, true, true);
		}
	});
});

// Helper function to handle input actions
function handleInput(input, isDelete = false, isHeldCheck = false) {
	if (isDelete) {
		let isHeld = false;
		let timeoutId = setTimeout(() => {
			isHeld = true;
			clearDisplay();
			console.log("Delete held");
		}, 1000);
			handleInput(null, true, true);
		}
	});
});

/**
 * @param {string} input
 * @param {Boolean} isDelete
 * @param {Boolean} isHeldCheck
 * @returns {void}
 * @description Handles the input from the user
 */
function handleInput(input, isDelete = false, isHeldCheck = false) {
	if (isDelete) {
		let isHeld = false;
		let timeoutId = setTimeout(() => {
			isHeld = true;
			clearDisplay();
			console.log("Delete held");
		}, 1000);

		const onRelease = () => {
			clearTimeout(timeoutId);

			if (!isHeld) {
				clearLastInput();
				activeExpression = display.value;
			}

			// Clean up event listener
			document.removeEventListener(
				isHeldCheck ? "keyup" : "mouseup",
				onRelease
			);
		};

		document.addEventListener(isHeldCheck ? "keyup" : "mouseup", onRelease);
	} else {
		appendChar(input);
	}
}

/**
 * @param {string} input
 * @param {Boolean} isDelete
 * @param {Boolean} isHeldCheck
 * @returns {void}
 * @description Handles the input from the user
 */
function handleInput(input, isDelete = false, isHeldCheck = false) {
	if (isDelete) {
		let isHeld = false;
		let timeoutId = setTimeout(() => {
			isHeld = true;
			clearDisplay();
			console.log("Delete held");
		}, 1000);

		const onRelease = () => {
			clearTimeout(timeoutId);

			if (!isHeld) {
				clearLastInput();
			}

			// Clean up event listener
			document.removeEventListener(
				isHeldCheck ? "keyup" : "mouseup",
				onRelease
			);
		};

		document.addEventListener(isHeldCheck ? "keyup" : "mouseup", onRelease);
	} else {
		appendChar(input);
	}
}

/**
 * @param {string} char
 * @returns {void}
 * @description Appends a character to the active expression
 */
function appendChar(char) {
	let tokenizedExpression = null;
	let lastChar = null;
	let lastToken = null;

	if (!activeExpression) {
		activeExpression += char;
	} else {
		tokenizedExpression = tokenizeExpression(activeExpression);
		lastChar = activeExpression[activeExpression.length - 1];
		lastToken = tokenizedExpression[tokenizedExpression.length - 1];
		if (
			(lastChar === "." && char === ".") ||
			(lastToken.includes(".") && char === ".")
		)
			return;
		if (
			char === lastChar ||
			(operatorRegex.test(lastChar) && operatorRegex.test(char))
		)
			deleteLastChar();
		activeExpression += char;
	}
	updateDisplay();
}

/**
 * @returns {string}
 * @description Returns the last token in the active expression
 */
function deleteLastChar() {
	activeExpression = activeExpression.slice(0, -1);
	let isHeld = false;
	let timeoutId = null;
	updateDisplay();
}

/**
 * @returns {string}
 * @description Returns the last token in the active expression
 */
function deleteLastChar() {
	activeExpression = activeExpression.slice(0, -1);
	let isHeld = false;
	let timeoutId = null;
	updateDisplay();
}

/**
 * @param {number} nthToken
 * @returns {string}
 * @description Returns the nth token from the end of the active expression
 */
function getLastNthToken(nthToken) {
	try {
		let tokenizedExpression = tokenizeExpression(activeExpression);
		return tokenizedExpression[tokenizedExpression.length - nthToken];
	} catch (error) {
		console.error(error);
	}
}

/**
 * @returns {string}
 * @description Returns the last operator in the active expression
 */
function getLastOperator() {
	let tokenizedExpression = tokenizeExpression(activeExpression);
	let lastOperator = tokenizedExpression.filter((token) =>
		operatorRegex.test(token)
	);
	return lastOperator[lastOperator.length - 1];
}

/**
 * @returns {string}
 * @description Returns the last number in the active expression in string form
 */
function getLastNumber() {
	let tokenizedExpression = tokenizeExpression(activeExpression);
	let lastNumber = tokenizedExpression.filter(
		(token) => !operatorRegex.test(token)
	);
	return parseFloat(lastNumber[lastNumber.length - 1]);
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
	console.log("Display updated");
}

/**
 * @description Clears the display
 */
function clearDisplay() {
	activeExpression = "";
	console.log("Expression cleared");
	updateDisplay();
	console.log("Display cleared");
}

/**
 * @description Clears the last input
 */
function clearLastInput() {
	const display = document.getElementById("display");
	display.value = display.value.slice(0, -1);
	activeExpression = display.value;
	console.log(`Last input cleared Expression : ${activeExpression}`);
}
