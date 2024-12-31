/** Restart
 * var activeExpression = ""; use regex to allow building expression, use ÷ instead of / and x instead of *
 * buildExpression function to use buttons to build string
 * update screen with string on button press
 * Percent calculation should multiply the decimal form by the result to percent e.g. 5+5% is 5+(5*0.05) whereas 5*5% is just 5*0.05
 * Use regex to tokenize expression to allow following of pemdas, if % symbol is found, convert it to desired number based on last numerical token
 */

let expression = ""; // variable to allow expression building
var activeOp = false; // variable for active operation checks
var isPercent = false;

// DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", function () {
	const display = getDisplay(); // variable for calculator display

	// Display listener, prevents non-numerical inputs from being proccessed and displayed.
	// TODO: add support for operation and display clearing
	display.addEventListener("input", (event) => {
		const value = event.target.value;
		const displayRegex = /^\d*$/;
		if (!displayRegex.test(value)) {
			event.target.value = value.slice(0, -1);
		}
	});

	// Keyboard listener, allows numerical input via keystrokes
	window.addEventListener("keydown", function (event) {
		event.preventDefault();
		if (!isNaN(event.key)) {
			activeOp ? clearDisplay() : "";
			displayInt(event.key);
			clearOperatorOutline();
		} else if (event.key === "Backspace") {
			display.value = getDisplayValue().slice(0, -1);
		}
	});

	const operatorBtns = document.querySelectorAll(".op"); // variable to obtain all operator button elements (÷, x, -, +)
	// Loop to apply listeners to operator buttons. toggles button highlghting for visibility
	for (let i = 0; i < operatorBtns.length; i++) {
		operatorBtns[i].addEventListener("click", function () {
			clearOperatorOutline();
			operatorBtns[i].classList.toggle("active");
			activeOp = true;
		});
	}
});
// End DOMContentLoaded Listener

// Helper function for calculating percent values in the equation
function togglePercent() {
	const percentBtn = document.getElementById("percent");
	const displayedValue = getDisplay().value;
	const expressionArr = expression.split(/[/*\-+]/).filter(Boolean);
	const percentVal =
		expressionArr[expressionArr.length - 1] * (displayedValue / 100);
	const diaplay = getDisplay();
	diaplay.value = percentVal;
	percentBtn.classList.toggle("outline");
	isPercent ? (isPercent = false) : (isPercent = true);
}

// Calculates the result from the expression and updates the display
function calcAndDisplay() {
	let result = 0;
	const display = getDisplay();
	expression += `${getDisplayValue()}`;
	console.log(expression);
	if (isNaN(expression)) {
		result = eval(expression);
	} else {
		result = parseInt(getDisplayValue()) + parseInt(getDisplayValue());
		// TODO: Add calculation limitation or number reformatting if display.value.length is larger than display max char length.
	}
	clearOperatorOutline();
	display.value = result;
}

// Takes current value within the display and pushes it into the expression along with the active operator
function pushExpression() {
	const display = getDisplay;
	const activeButton = document.getElementsByClassName("active")[0];

	let activeOperator = activeButton.innerHTML.toLowerCase();
	activeOperator === "÷"
		? (activeOperator = "/")
		: activeOperator === "x"
		? (activeOperator = "*")
		: "";
	expression += `${getDisplayValue()}${activeOperator}`;
}

// Clears all outlines
function clearOutlines() {
	const outlinedBtns = document.querySelectorAll(".outline");
	for (let i = 0; i < outlinedBtns.length; i++) {
		outlinedBtns[i].classList.remove("outline");
	}
	clearOperatorOutline();
}

// Clears outline from all operator buttons
function clearOperatorOutline() {
	activeOp = false;
	const operatorBtns = document.querySelectorAll(".op");
	operatorBtns.forEach((btn) => {
		btn.classList.contains("active") ? btn.classList.remove("active") : "";
	});
}

// Clears calculator's display
function clearDisplay() {
	display.value = "";
}

// Clears calculator's display and resets expression
function clearAndReset() {
	clearDisplay();
	clearOutlines();
	expression = "";
}

// Toggles negative value indicator on/off in calculator display
function toggleNegative() {
	const negativeRegex = /^-/;
	if (!negativeRegex.test(getDisplayValue())) {
		display.value = `-${getDisplayValue()}`;
	} else {
		display.value = `${getDisplayValue().substring(1)}`;
	}
}

// Displays value on calculator display with given input. Used on numerical buttons within calculator
function displayInt(buttonVal) {
	const decimalRegex = /^(?=.*\.)[^.]*$/;
	if (activeOp) {
		pushExpression();
		clearDisplay();
	}
	clearOperatorOutline();
	display.value =
		buttonVal === "." && getDisplayValue().includes(".")
			? getDisplayValue()
			: `${getDisplayValue()}${buttonVal}`;
	console.log(`:::Expr - ${expression}`);
}

function getDisplay() {
	return document.getElementById("display");
}

function getDisplayValue() {
	const display = document.getElementById("display");
	return display.value;
}
