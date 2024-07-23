import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("Deletable controller connected!")
  }

  // Delete a row from the ACT values form
  deleteActValues(event) {
    event.preventDefault()
    const row = event.target.closest(".act-row")
    console.log("Delete ACT row", row)
    row.remove()
  }

  // Delete a row from the heparins values form
  deleteBolus(event) {
    event.preventDefault()
    const row = event.target.closest(".bolus-row")
    console.log("Delete bolus row", row)
    row.remove()
  }

  // Delete a row from the heparins infusions form
  deleteInfusion(event) {
    event.preventDefault()
    const row = event.target.closest(".infusion-row")
    console.log("Delete infusion row", row)
    row.remove()
  }
}
