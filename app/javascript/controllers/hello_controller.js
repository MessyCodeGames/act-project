import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "weight", "result2", "form", "result"]

  connect() {
    console.log("Hello World!")
    this.result = this.element.dataset.result;
    console.log(this.result)
  }

  addiction(event) {
    event.preventDefault()

    // Get form data
    const form = event.target
    console.log(form)

    // Create FormData object
    const formData = new FormData(form)
    console.log(formData)

    // Create AJAX request
    const resquestDetails = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: formData
    }

    // Send AJAX request to the backend without reloading the page
    fetch('/calculate', resquestDetails)
    .then(response => response.json())

    // Handle the response
    .then(data => {
      console.log(data)

      // Update the resultTarget with the result
      this.resultTarget.textContent = `Result: ${data.result}`;
    })
  }

  // Calculate the sum of the weights and display it
  // when the form is submitted
  calculate(event) {
    event.preventDefault()
    console.log(this.weightTarget)

    // Get the weights (in case there are multiple inputs' rows)
    const weights = document.querySelectorAll(".weight")
    console.log(weights)

    // Calculate the sum of the weights
    let result = 0
    weights.forEach((weight) => {
      console.log(weight.value)
      result += parseInt(weight.value)
    })

    // Display the result by updating the div
    console.log(result)
    this.result2Target.innerHTML = result
  }

  // Add a new row to the form
  addrow(event) {
    event.preventDefault()
    console.log(event)
    console.log(this.formTarget)

    // Create a new row
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="weight">Poids 2</label>
      <input type="number" name="weight" data-hello-target="weight" class="weight">
    `

    // Append the row to the form
    this.formTarget.appendChild(row)
  }
}
