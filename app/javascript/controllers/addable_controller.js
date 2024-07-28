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
    // row.classList.add("act-row", "flex", "items-center", "gap-2", "my-2")
    row.classList.add("act-row", "md:flex", "items-center")

    row.innerHTML = `
    <div class="flex items-center md:gap-2 md:my-2 md:text-xl text-sm gap-0.5 my-0.5">
      <label for="_acts_act_value_measured" class="md:text-xl text-sm flex items-center md:mr-2 mr-1">Measured ACT values</label>
      <input placeholder="seconds" type="number" name="[acts][act_value_measured]" id="_acts_act_value_measured" min="1" max="1000" class="md:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark md:p-2 p-1 focus:border-icon-color-dark data-hj-allow">

      <label for="_acts_act_measurement_time" class="md:text-xl text-sm flex items-center md:mr-2 mr-1">Time</label>
      <input type="datetime-local" name="[acts][act_measurement_time]" id="_acts_act_measurement_time" class="w-full max-w-full md:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark md:p-2 p-1 focus:border-icon-color-dark data-hj-allow">
    </div>
    <div class="justify-center items-center md:flex">
      <button data-action="click->moveable#actMoveUp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="md:w-8 md:h-8 md:ml-2 w-4 h-4 ml-1 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->moveable#actMoveDown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="md:w-8 md:h-8 md:ml-2 w-4 h-4 ml-1 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->deletable#deleteActValues">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="md:w-8 md:h-8 md:ml-2 w-4 h-4 ml-1 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
      </div>
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
      <label for="_heparins_bolus_given" class="text-xl">Heparin bolus injection</label>
      <input placeholder="Total UI per shot" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given" min="1" class="flex-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark p-2 focus:border-icon-color-dark data-hj-allow">

      <label for="_heparins_bolus_time" class="text-xl">Time</label>
      <input type="datetime-local" name="[heparins][bolus_time]" id="_heparins_bolus_time" class="flex-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark p-2 focus:border-icon-color-dark data-hj-allow">

      <button data-action="click->moveable#bolusMoveUp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->moveable#bolusMoveDown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->deletable#deleteBolus">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
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
      <label for="_heparins_infusion_rate_given" class="text-xl">Heparin infusion</label>
      <input placeholder="Infusion rate(UI per hour)" type="number" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given" min="1" class="flex-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark p-2 focus:border-icon-color-dark data-hj-allow">

      <label for="_heparins_infusion_duration" class="text-xl">Duration</label>
      <input placeholder="minutes" type="number" name="[heparins][infusion_duration]" id="_heparins_infusion_duration" min="1" class="flex-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark p-2 focus:border-icon-color-dark data-hj-allow">

      <label for="_heparins_infusion_time" class="text-xl">Start time</label>
      <input type="datetime-local" name="[heparins][infusion_time]" id="_heparins_infusion_time" class="flex-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark p-2 focus:border-icon-color-dark data-hj-allow">

      <button data-action="click->moveable#infusionMoveUp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->moveable#infusionMoveDown">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM244.7 395.3l-112-112c-4.6-4.6-5.9-11.5-3.5-17.4s8.3-9.9 14.8-9.9l64 0 0-96c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 96 64 0c6.5 0 12.3 3.9 14.8 9.9s1.1 12.9-3.5 17.4l-112 112c-6.2 6.2-16.4 6.2-22.6 0z"/>
        </svg>
      </button>
      <button data-action="click->deletable#deleteInfusion">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 ml-2 fill-current text-icon-color-dark hover:text-active-color active:scale-95">
          <path fill="icon-color-dark" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
        </svg>
      </button>
  `
    console.log("Add infusion row", this.heparinsInfusionsTarget)
    this.heparinsInfusionsTarget.appendChild(row)
  }
}
