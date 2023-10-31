/*
  TODO: 
    - Limit numDigits to max supported by JS
    - anything * 0 doesn't work
*/

import { isNum, isOperator, isDecimal } from "./utils";
import ErrorHandler from './errors';
import { solveEquation } from './operations'

// var moreBttns = document.querySelector('moreBttns'),
//       normalBttns = document.forms[0],
//       advancedBttns = document.forms[1];

var error = (document.getElementsByClassName("error")[0] as HTMLElement), // error popup
  // calc = document.getElementsByClassName("calculator")[0], // calculator
  equationUI = (document.getElementsByClassName("equation")[0] as HTMLInputElement), // display equation
  solutionUI = (document.getElementsByClassName("solution")[0] as HTMLInputElement); // display solution

// Equation
let equation: string = '';
export function getEquation() {
  return equation;
}
export function setEquation(val: string) {
  equation = val;
  equationUI.value = val;
}

// Solution
let solution: string = '';
export function getSolution(): string {
  return solution;
}
export function setSolution(val: string | number) {
  solution = val;
  solutionUI.value = val;
}
export const resetSolution = () => setSolution("");

// Cache
let numbers: string[] = [];
let operators: string[] = [];
let previousVal: string = '';


// Setup error handling
const errors = new ErrorHandler(error);

// Separates equation into numbers and operators
function splitEqn(eqn: string): void {
  let wasDecimalFound = false;

  // Reset previous equation's values
  numbers = [];
  operators = [];

  // Iterate over characters in equation
  for (let i = 0, operPos = 0, len = eqn.length, char = ""; i < len; i++) {
    char = eqn.charAt(i); // Store current char

    // Handle Operators
    if (isOperator(char)) {
      // Check that first char is number, else error
      if (i === 0) {
        // TODO: errors.showError() is only called the first time here. Should be called after clearing too.
        errors.showError("Must start with an operator");
        return;
      }
      // We can safely say the previous char isn't part of a decimal value
      // bc an operator can't be in the middle of a valid number
      else if (wasDecimalFound) {
        wasDecimalFound = false;
      }
      // Logical Error Handling - Operation on an operation
      else if (isOperator(eqn.charAt(i - 1))) {
        errors.showError("Can't do two operators in a row. ");
        return;
      }
      // If Error Free: Add operator to operators
      else {
        operators.push(char);
      }
      operPos++;
    }
    // Handle Numbers
    else if (isNum(char)) {
      // Logical Error Handling - Divide by Zero
      if (char === "0" && eqn.charAt(i - 1) === "/") {
        errors.showError("Can't divide by zero. ");
        return;
      }
      // If we encounter a number, either after a decimal point character is encountered
      // or if the previous char was a number, append the digit to the most recent number
      else if (wasDecimalFound || numbers[operPos]) {
        numbers[operPos] += char;
      }
      // Or add a new number
      else {
        numbers.push(char);
      }
    } else if (isDecimal(char)) {
      // Disallow numbers having mulitple decimal points
      if (wasDecimalFound) {
        errors.showError("Cannot have two decimal points in a row");
        return;
      }
      // Continue looking for the rest of the decimal number
      wasDecimalFound = true;
      // Append decimal point to the number string
      numbers[operPos] += char;
      continue;
    } else {
      errors.showError("Unknown error.");
      return;
    }
  }
}

// Handle user input
export function bttnHandler(val: string): void {
  if (errors.isErrorOngoing) {
    if (val === "clear") {
      errors.hideError();
    }
    return;
  }
  // Handle digits
  else if (isNum(val)) {
    // If last input was an operator
    if (isOperator(previousVal)) {
      resetSolution();
    }
    if (val === "0") {
      if (previousVal === "/") {
        errors.showError("Cannot divide by zero");
        return;
      }
    }
    setSolution(Number(getSolution() + val));
    previousVal = val;
  }
  //Handle simple functions
  else if (isOperator(val)) {
    //Error Handling: Operating on an operator
    if (isOperator(previousVal)) {
      errors.showError("Cannot do two operators in a row.");
      setSolution(getSolution().toString().slice(0, -1));
    }
    //Error Handling: Operation after equals
    else if (previousVal === "equals") {
      setEquation(numbers.length === 0 ? getEquation() : getEquation() + val);
      resetSolution();
    } else {
      //Set equation
      setEquation(
        numbers.length === 0
          ? getSolution() + val
          : getEquation() + getSolution() + val
      );
      //Prep for solving
      splitEqn(getEquation());
      //Solve eqn
      setSolution(solveEquation(numbers, operators));
      previousVal = val;
    }
  }
  //Handle modifier operations/special functions
  else if (val === ".") {
    setSolution(getSolution() + ".");
    previousVal = val;
  } else if (val === "clear") {
    setEquation("");
    resetSolution();
    previousVal = val;
  } else if (val === "percent") {
    setSolution(getSolution() * 100);
    previousVal = val;
  } else if (val === "sqrt") {
    setSolution(Math.sqrt(getSolution()));
    previousVal = val;
  } else if (val === "squared") {
    setSolution(getSolution() * getSolution());
    previousVal = val;
  } else if (val === "backspace") {
    //Hide error msg if showing
    if (val === "clear") {
      errors.hideError();
    }
    //If solution is empty, backspace equation
    else if (getSolution() === "") {
      setEquation(getEquation().toString().slice(0, -1));
    }
    //Otherwise backspace solution
    else {
      setSolution(getSolution().toString().slice(0, -1));
    }
    previousVal = getSolution().toString().substr(-1);
  } else if (val === "equals") {
    if (previousVal === "equals") {
      return;
    }
    setEquation(getEquation() + getSolution());
    //Prep for solving
    splitEqn(getEquation());
    //Solve eqn
    setSolution(solveEquation(numbers, operators));
    previousVal = val;
  }
}