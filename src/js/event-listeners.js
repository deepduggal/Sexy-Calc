/*****
 * EVENT LISTENERS
 *****/

import { scrollToCalculator } from "./animations";
import { onClick, onKeyDown } from "./input";

// Calculation Event Listeners
document.body.addEventListener("keydown", onKeyDown);
document.body.addEventListener("click", onClick);

// Scroll down on page load
window.addEventListener("load", () => scrollToCalculator(1.5));

// Click "Sexy Calc" logo to scroll down to calculator
const logo = document.getElementsByClassName("logo")[0]; // loading logo
logo.addEventListener("click", () => scrollToCalculator());