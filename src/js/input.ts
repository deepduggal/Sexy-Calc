/*****
 * Handle User Input
 *****/

import { bttnHandler } from './calculator';

const validKeyboardKeys = new Map(Object.entries({
  "/": "/",
  "*": "*",
  "-": "-",
  "+": "+",
  "=": "=",
  ".": ".",
  '0': "0",
  '1': "1",
  '2': "2",
  '3': "3",
  '4': "4",
  '5': "5",
  '6': "6",
  '7': "7",
  '8': "8",
  '9': "9",
  'Backspace': "backspace",
  'Enter': "equals",
  'Clear': "equals",
  ' ': "equals",
  'Spacebar': "equals"
}));

export function onKeyDown(event: KeyboardEvent) {
  event.stopPropagation();
  const { key } = event;
  if (key && validKeyboardKeys.has(key)) {
    event.preventDefault();
    bttnHandler(validKeyboardKeys.get(key));
  }
}

const validButtonNames = new Map(Object.entries({
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  decimalPoint: ".",
  divide: "/",
  multiply: "*",
  subtract: "-",
  add: "+",
  equals: "equals",
  clear: "clear",
  percent: "percent",
  squareRoot: "sqrt",
  squared: "squared",
  backspace: "backspace"
}));

export function onClick(event: MouseEvent) {
  event.stopPropagation();

  const { target } = event;
  var name = (target as HTMLInputElement).getAttribute("name");

  // If a valid button was pressed
  if (name && validButtonNames.has(name)) {
    event.preventDefault();
    bttnHandler(validButtonNames.get(name));
  }
}