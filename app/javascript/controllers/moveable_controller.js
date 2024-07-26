import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  connect() {
    console.log("Moveable controller connected!")
  }

  // Move a row up
  actMoveUp(event) {
    event.preventDefault()
    console.log("Move up", event.target.closest('.act-row'))
    const row = event.target.closest('.act-row')
    console.log("Previous row", row.previousElementSibling)
    const previousRow = row.previousElementSibling
    if (previousRow && previousRow.classList.contains('act-row')) {
      row.parentNode.insertBefore(row, previousRow)
    }
  }

  // Move a row down
  actMoveDown(event) {
    event.preventDefault()
    console.log("Move down", event.target.closest('.act-row'))
    const row = event.target.closest('.act-row')
    console.log("Next row", row.nextElementSibling)
    const nextRow = row.nextElementSibling
    if (nextRow && nextRow.classList.contains('act-row')) {
      row.parentNode.insertBefore(nextRow, row)
    }
  }

  bolusMoveUp(event) {
    event.preventDefault()
    console.log("Move up", event.target.closest('.bolus-row'))
    const row = event.target.closest('.bolus-row')
    console.log("Previous row", row.previousElementSibling)
    const previousRow = row.previousElementSibling
    if (previousRow && previousRow.classList.contains('bolus-row')) {
      row.parentNode.insertBefore(row, previousRow)
    }
  }

  bolusMoveDown(event) {
    event.preventDefault()
    console.log("Move down", event.target.closest('.bolus-row'))
    const row = event.target.closest('.bolus-row')
    console.log("Next row", row.nextElementSibling)
    const nextRow = row.nextElementSibling
    if (nextRow && nextRow.classList.contains('bolus-row')) {
      row.parentNode.insertBefore(nextRow, row)
    }
  }

  infusionMoveUp(event) {
    event.preventDefault()
    console.log("Move up", event.target.closest('.infusion-row'))
    const row = event.target.closest('.infusion-row')
    console.log("Previous row", row.previousElementSibling)
    const previousRow = row.previousElementSibling
    if (previousRow && previousRow.classList.contains('infusion-row')) {
      row.parentNode.insertBefore(row, previousRow)
    }
  }

  infusionMoveDown(event) {
    event.preventDefault()
    console.log("Move down", event.target.closest('.infusion-row'))
    const row = event.target.closest('.infusion-row')
    console.log("Next row", row.nextElementSibling)
    const nextRow = row.nextElementSibling
    if (nextRow && nextRow.classList.contains('infusion-row')) {
      row.parentNode.insertBefore(nextRow, row)
    }
  }
}
