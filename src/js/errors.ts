/**
 * Error handling methods
 */

import { showError as showErrorAnimation, hideError as hideErrorAnimation } from "./animations";

export default class ErrorHandler {
  errorContainer: HTMLElement;
  isErrorOngoing: boolean;
  
  constructor(container: HTMLElement) {
    this.errorContainer = container;
    this.isErrorOngoing = false;
  }

  // Clear the error message
  hideError() {
    if (this.isErrorOngoing) {
      hideErrorAnimation(this.errorContainer);
      this.isErrorOngoing = false;
    }
  }

  // Show an error message and hide it after a timeout
  showError(message: string = "An unknown error occurred. Try again?", timeout = 3000) {
    this.isErrorOngoing = true;
    this.errorContainer.innerText = message;
    showErrorAnimation(this.errorContainer);

    setTimeout(() => {
      this.hideError();
    }, timeout);
  }
}