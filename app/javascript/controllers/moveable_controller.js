import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("Moveable controller connected!")
  }

  actMoveUp(event) {
    this.moveUp(event, 'act-row')
  }

  actMoveDown(event) {
    this.moveDown(event, 'act-row')
  }

  bolusMoveUp(event) {
    this.moveUp(event, 'bolus-row')
  }

  bolusMoveDown(event) {
    this.moveDown(event, 'bolus-row')
  }

  infusionMoveUp(event) {
    this.moveUp(event, 'infusion-row')
  }

  infusionMoveDown(event) {
    this.moveDown(event, 'infusion-row')
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
