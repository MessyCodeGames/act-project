import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toggle"
export default class extends Controller {
  static targets = ["togglableElement", "buttonActive"]

  connect() {
    console.log("Toggle controller is well connected")
  }

  fire() {
    this.togglableElementTarget.classList.toggle("hidden");

    this.buttonActiveTarget.classList.toggle("bg-light-color");
    this.buttonActiveTarget.classList.toggle("md:hover:bg-very-light-color");
    this.buttonActiveTarget.classList.toggle("scale-95")
    this.buttonActiveTarget.classList.toggle("active:scale-90")
  }
}
