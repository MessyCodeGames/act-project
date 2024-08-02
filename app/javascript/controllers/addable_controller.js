import { Controller } from "@hotwired/stimulus"
import { updateMoveableButtons } from "./updateMoveableButtons"

export default class extends Controller {
  static targets = ["actValues", "heparinsValues", "heparinsInfusions"]

  connect() {
    console.log("Addable controller connected!")
  }

  // Add a new row to the ACT values form
  addActValues(event) {
    event.preventDefault()
    const row = document.createElement("div")
    // row.classList.add("act-row", "flex", "items-center", "gap-2", "my-2")
    row.classList.add("act-row", "lg:flex", "lg:items-center")

    row.innerHTML = `
      <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
        <div class="flex flex-row w-full">
          <label for="_acts_act_value_measured" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Measured ACT values</label>
          <input placeholder="seconds" type="number" name="[acts][act_value_measured]" required="required" id="_acts_act_value_measured" min="1" max="1000" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
        <div class="flex flex-row w-full">
          <label for="_acts_act_measurement_time" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Time</label>
          <input type="datetime-local" data-form-handler-target="actDatetimeInput" required="required" name="[acts][act_measurement_time]" id="_acts_act_measurement_time" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
      </div>

      <div class="lg:justify-center items-center flex justify-end">
        <button data-action="click->moveable#actMoveDown" class="move-down invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->moveable#actMoveUp" class="move-up invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->deletable#deleteActValues">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
          </svg>
        </button>
      </div>
    `
    console.log("Add ACT row", this.actValuesTarget)
    this.actValuesTarget.appendChild(row)
    const rows = this.actValuesTarget.querySelectorAll('.act-row')
    console.log("rows", rows)
    updateMoveableButtons(rows)
  }

  // Add a new row to the heparins values form
  addBolus(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("bolus-row", "lg:flex", "lg:items-center")
    row.innerHTML = `
      <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
        <div class="flex flex-row w-full">
          <label for="_heparins_bolus_given" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Heparin bolus injection</label>
          <input placeholder="Total UI per shot" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given" min="1" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
        <div class="flex flex-row w-full">
          <label for="_heparins_bolus_time" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Time</label>
          <input type="datetime-local" data-form-handler-target="bolusDatetimeInput" name="[heparins][bolus_time]" id="_heparins_bolus_time" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
      </div>

      <div class="lg:justify-center items-center flex justify-end">
        <button data-action="click->moveable#bolusMoveDown" class="move-down invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->moveable#bolusMoveUp" class="move-up invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->deletable#deleteBolus">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
          </svg>
        </button>
      </div>
    `
    console.log("Add bolus row", this.heparinsValuesTarget)
    this.heparinsValuesTarget.appendChild(row)
    const rows = this.heparinsValuesTarget.querySelectorAll('.bolus-row')
    console.log("rows", rows)
    updateMoveableButtons(rows)
  }

  // Add a new row to the heparins infusions form
  addInfusion(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.classList.add("infusion-row", "lg:flex", "lg:items-center")
    row.innerHTML = `
      <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
        <div class="flex flex-row w-full">
        <label for="_heparins_infusion_rate_given" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Heparin infusion</label>
        <input placeholder="IR (UI per hour)" type="number" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given" min="1" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
        <div class="flex flex-row w-full">
        <label for="_heparins_infusion_duration" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Duration</label>
        <input placeholder="minutes" type="number" name="[heparins][infusion_duration]" id="_heparins_infusion_duration" min="1" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
        <div class="flex flex-row w-full">
        <label for="_heparins_infusion_time" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Start time</label>
        <input type="datetime-local" data-form-handler-target="infusionDatetimeInput" name="[heparins][infusion_time]" id="_heparins_infusion_time" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
        </div>
      </div>
      <div class="lg:justify-center items-center flex justify-end">
        <button data-action="click->moveable#infusionMoveDown" class="move-down invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->moveable#infusionMoveUp" class="move-up invisible">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
          </svg>
        </button>
        <button data-action="click->deletable#deleteInfusion">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="lg:w-8 lg:h-8 lg:ml-2 w-6 h-6 ml-1 fill-current text-icon-color-dark lg:hover:text-active-color active:scale-95">
            <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
          </svg>
        </button>
      </div>
    `
    console.log("Add infusion row", this.heparinsInfusionsTarget)
    this.heparinsInfusionsTarget.appendChild(row)
    const rows = this.heparinsInfusionsTarget.querySelectorAll('.infusion-row')
    console.log("rows", rows)
    updateMoveableButtons(rows)
  }
}
