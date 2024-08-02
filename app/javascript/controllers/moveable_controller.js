import { Controller } from "@hotwired/stimulus"
import { updateMoveableButtons } from "../modules/updateMoveableButtons.js"

export default class extends Controller {

  connect() {
    console.log("Moveable controller connected!")
  }

  actMoveUp(event) {
    this.moveUp(event, 'act-row')
    const rows = document.querySelectorAll('.act-row')
    updateMoveableButtons(rows);
  }

  actMoveDown(event) {
    this.moveDown(event, 'act-row')
    const rows = document.querySelectorAll('.act-row')
    updateMoveableButtons(rows);
  }

  bolusMoveUp(event) {
    this.moveUp(event, 'bolus-row')
    const rows = document.querySelectorAll('.bolus-row')
    updateMoveableButtons(rows);
  }

  bolusMoveDown(event) {
    this.moveDown(event, 'bolus-row')
    const rows = document.querySelectorAll('.bolus-row')
    updateMoveableButtons(rows);
  }

  infusionMoveUp(event) {
    this.moveUp(event, 'infusion-row')
    const rows = document.querySelectorAll('.infusion-row')
    updateMoveableButtons(rows);
  }

  infusionMoveDown(event) {
    this.moveDown(event, 'infusion-row')
    const rows = document.querySelectorAll('.infusion-row')
    updateMoveableButtons(rows);
  }

  moveUp(event, class_name) {
    event.preventDefault()
    console.log("Move up", event.target.closest(`.${class_name}`))
    const row = event.target.closest(`.${class_name}`)
    console.log("Previous row", row.previousElementSibling)
    const previousRow = row.previousElementSibling
    if (previousRow && previousRow.classList.contains(class_name)) {
      row.parentNode.insertBefore(row, previousRow)
    }
  }

  moveDown(event, class_name) {
    event.preventDefault()
    console.log("Move down", event.target.closest(`.${class_name}`))
    const row = event.target.closest(`.${class_name}`)
    console.log("Next row", row.nextElementSibling)
    const nextRow = row.nextElementSibling
    if (nextRow && nextRow.classList.contains(class_name)) {
      row.parentNode.insertBefore(nextRow, row)
    }
  }
}
