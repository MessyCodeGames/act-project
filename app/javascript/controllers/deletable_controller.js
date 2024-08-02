import { Controller } from "@hotwired/stimulus"
import { updateMoveableButtons } from "../modules/updateMoveableButtons.js"

export default class extends Controller {

  connect() {
    console.log("Deletable controller connected!")
  }

  // Delete a row from the ACT values form
  deleteActValues(event) {
    this.deleteField(event, ".act-row")
  }

  // Delete a row from the heparins values form
  deleteBolus(event) {
    this.deleteField(event, ".bolus-row")
  }

  // Delete a row from the heparins infusions form
  deleteInfusion(event) {
    this.deleteField(event, ".infusion-row")
  }

  deleteField(event, class_name) {
    event.preventDefault()
    const row = event.target.closest(class_name)
    console.log("Delete row", row)
    row.remove()
    const rows = document.querySelectorAll(class_name)
    updateMoveableButtons(rows);
  }
}
