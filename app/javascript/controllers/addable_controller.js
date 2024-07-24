import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["actValues", "heparinsValues", "heparinsInfusions"]

  connect() {
    console.log("Addable controller connected!")
  }

  // Add a new row to the ACT values form
  addActValues(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("act-row", "flex", "items-center", "gap-2", "my-2")
    row.innerHTML = `
      <label for="_acts_act_value_measured">Measured ACT values</label>
      <input placeholder="seconds" type="number" name="[acts][act_value_measured]" id="_acts_act_value_measured">

      <label for="_acts_act_measurement_time">Time</label>
      <input type="datetime-local" name="[acts][act_measurement_time]" id="_acts_act_measurement_time">

      <button data-action="click->deletable#deleteActValues">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2">
          <path fill="#000000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
    `
    console.log("Add ACT row", this.actValuesTarget)
    this.actValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins values form
  addBolus(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("bolus-row", "flex", "items-center", "gap-2", "my-2")
    row.innerHTML = `
      <label for="_heparins_bolus_given">Heparin bolus injection</label>
      <input placeholder="Total UI per shot" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given">

      <label for="_heparins_bolus_time">Time</label>
      <input type="datetime-local" name="[heparins][bolus_time]" id="_heparins_bolus_time">

      <button data-action="click->deletable#deleteBolus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2">
          <path fill="#000000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
    `
    console.log("Add bolus row", this.heparinsValuesTarget)
    this.heparinsValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins infusions form
  addInfusion(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("infusion-row", "flex", "items-center", "gap-2", "my-2")
    row.innerHTML = `
      <label for="_heparins_infusion_rate_given">Heparin infusion</label>
      <input placeholder="Infusion rate(UI per hour)" type="number" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given">

      <label for="_heparins_infusion_duration">Duration</label>
      <input placeholder="minutes" type="number" name="[heparins][infusion_duration]" id="_heparins_infusion_duration">

      <label for="_heparins_infusion_time">Start time</label>
      <input type="datetime-local" name="[heparins][infusion_time]" id="_heparins_infusion_time">

      <button data-action="click->deletable#deleteInfusion">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2">
          <path fill="#000000" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
  `
    console.log("Add infusion row", this.heparinsInfusionsTarget)
    this.heparinsInfusionsTarget.appendChild(row)
  }
}
