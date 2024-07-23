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
    row.classList.add("act-row")
    row.innerHTML = `
      <label for="_acts_act_value_measured">Measured ACT values</label>
      <input placeholder="seconds" type="number" name="[acts][act_value_measured]" id="_acts_act_value_measured">

      <label for="_acts_act_measurement_time">Time</label>
      <input type="datetime-local" name="[acts][act_measurement_time]" id="_acts_act_measurement_time">

      <button data-action="click->deletable#deleteActValues">
        <img style="height:40px;width:40px;" src="../../assets/images/bin.svg">
      </button>
    `
    console.log("Add ACT row", this.actValuesTarget)
    this.actValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins values form
  addBolus(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("bolus-row")
    row.innerHTML = `
      <label for="_heparins_bolus_given">Heparin bolus injection</label>
      <input placeholder="UI total par dose" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given">

      <label for="_heparins_bolus_time">Time</label>
      <input type="datetime-local" name="[heparins][bolus_time]" id="_heparins_bolus_time">

      <button data-action="click->deletable#deleteBolus">
        <img style="height:40px;width:40px;" src="../../assets/images/bin.svg">
      </button>
    `
    console.log("Add bolus row", this.heparinsValuesTarget)
    this.heparinsValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins infusions form
  addInfusion(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("infusion-row")
    row.innerHTML = `
      <label for="_heparins_infusion_rate_given">Heparin infusion</label>
      <input placeholder="Ui par heure" type="number" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given">

      <label for="_heparins_infusion_duration">Duration</label>
      <input placeholder="minutes" type="number" name="[heparins][infusion_duration]" id="_heparins_infusion_duration">

      <label for="_heparins_infusion_time">Start time</label>
      <input type="datetime-local" name="[heparins][infusion_time]" id="_heparins_infusion_time">

      <button data-action="click->deletable#deleteInfusion">
        <img style="height:40px;width:40px;" src="/../../assets/images/bin.svg">
      </button>
  `
    console.log("Add infusion row", this.heparinsInfusionsTarget)
    this.heparinsInfusionsTarget.appendChild(row)
  }
}
