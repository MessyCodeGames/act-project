import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "result", "actvalues", "heparinsvalues"]

  connect() {
    console.log("Truc bidon!")
  }

  addiction(event) {
    event.preventDefault()

    // Get form data
    const form = event.target
    console.log(form)

    const var2 = form.querySelector('input[name="[acts][var2]"]').value
    const var3 = form.querySelector('input[name="[acts][var3]"]').value
    console.log(var2)
    console.log(var3)

    // Create FormData object
    const formData = new FormData(form)
    console.log(formData)
    // Log FormData contents
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Transform FormData
    const newFormData = this.transformFormData(formData);
    console.log(newFormData);

    // Create AJAX request
    const resquestDetails = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: newFormData
    }

    // Send AJAX request to the backend without reloading the page
    fetch('/calculate', resquestDetails)
    .then(response => response.json())

    // Handle the response
    .then(data => {
      console.log(data)

      // Update the resultTarget with the result
      // this.resultTarget.textContent = `Result: ${data.result}`;

      // Clear previous results
      this.resultTarget.innerHTML = ''

      // Create a header for the result
      const header = document.createElement('h3')
      header.textContent = 'Results:'
      this.resultTarget.appendChild(header)

      // Iterate over each key-value pair in the result object
      Object.entries(data.result).forEach(([key, value]) => {
        if (key === 'normalizedWeight') {
          const p = document.createElement('p');
          p.textContent = `Poids normalisé: ${value}`;
          this.resultTarget.appendChild(p);
        } else if (key === 'sumActValues') {
          const p = document.createElement('p');
          p.textContent = `Somme des ACTs: ${value}`;
          this.resultTarget.appendChild(p);
        } else {
          value.forEach((val, i) => {
            const p = document.createElement('p');
            p.textContent = `Time ${i}: ${val} minutes`;
            this.resultTarget.appendChild(p);
          })
        }
      })
      
    })
  }


  transformFormData(originalFormData) {
    const newFormData = new FormData();
    let var2Values = [];
    let var3Values = [];

    // Iterate over original FormData
    originalFormData.forEach((value, key) => {
      console.log(key, value)
      if (key === "[acts][var2]") {
        var2Values.push(value);
      } else if (key === "[acts][var3]") {
        var3Values.push(value);
      } else {
        newFormData.append(key, value);
      }
    });

    // Append the arrays to the new FormData
    // newFormData.append("var2", JSON.stringify(var2Values));
    // newFormData.append("var3", JSON.stringify(var3Values));
    newFormData.append("var2", var2Values);
    newFormData.append("var3", var3Values);
    console.log(var2Values)
    console.log(var3Values)

    return newFormData;
  }

  // Calculate the sum of the weights and display it
  // when the form is submitted
  // calculate(event) {
  //   event.preventDefault()
  //   console.log(this.weightTarget)

  //   // Get the weights (in case there are multiple inputs' rows)
  //   const weights = document.querySelectorAll(".weight")
  //   console.log(weights)

  //   // Calculate the sum of the weights
  //   let result = 0
  //   weights.forEach((weight) => {
  //     console.log(weight.value)
  //     result += parseInt(weight.value)
  //   })

  //   // Display the result by updating the div
  //   console.log(result)
  //   this.result2Target.innerHTML = result
  // }

  // Add a new row to the form
  addrow(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="_acts_var2">Valeur d'ACT mesurée</label>
      <input type="number" name="[acts][var2]" id="_acts_var2">

      <label for="_acts_var3">Temps</label>
      <input type="datetime-local" name="[acts][var3]" id="_acts_var3">
    `
    console.log("Add row", this.actvaluesTarget)
    this.actvaluesTarget.appendChild(row)
  }
}
