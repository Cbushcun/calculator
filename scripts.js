/** Restart
 * var activeExpression = ""; use regex to allow building expression, use ÷ instead of / and x instead of *
 * buildExpression function to use buttons to build string
 * update screen with string on button press
 * Percent calculation should multiply the decimal form by the result to percent e.g. 5+5% is 5+(5*0.05) whereas 5*5% is just 5*0.05
 * Use regex to tokenize expression to allow following of pemdas, if % symbol is found, convert it to desired number based on last numerical token
 */

let activeExpression = "";

document.addEventListener("DOMContentLoaded", function () {
	const buttons = document.querySelectorAll("button");
	buttons.forEach((button) => {
		button.addEventListener("click", (btn) => {
			console.log(btn.target.innerText);
		});
	});
});

function appendChar(char) {
	activeExpression += char;
}

function tokenizeExpression(expression) {
	return expression.match(/(\d+|\+|\-|\*|\/|\%)/g);
}
