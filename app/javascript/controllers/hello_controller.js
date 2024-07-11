import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "weight", "result2", "form"]

  connect() {
    console.log("Hello World!")
    this.result = this.element.dataset.result;
    console.log(this.result)
  }

  addiction(event) {
    event.preventDefault()
    console.log(event)
    console.log(this.result)
  }

  calculate(event) {
    event.preventDefault()
    console.log(this.weightTarget)
    const weights = document.querySelectorAll(".weight")
    console.log(weights)
    let result = 0
    weights.forEach((weight) => {
      console.log(weight.value)
      result += parseInt(weight.value)
    })
    console.log(result)
    this.result2Target.innerHTML = result
  }

  addrow(event) {
    event.preventDefault()
    console.log(event)
    console.log(this.formTarget)
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="weight">Poids 2</label>
      <input type="number" name="weight" data-hello-target="weight" class="weight">
    `
    this.formTarget.appendChild(row)
  }
}
