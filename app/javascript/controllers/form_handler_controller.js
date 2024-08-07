import { Controller } from "@hotwired/stimulus"
import { updateMoveableButtons } from "modules/updateMoveableButtons"

export default class extends Controller {
  static targets = ["form", "result", "actValues", "bolusValues", "infusionValues", "infusionValues",
    "actValueMeasured", "patientWeight", "actTarget", "timesBetweenBolus", "actDatetimeInput",
    "bolusGiven", "bolusDatetimeInput", "infusionRateGiven", "infusionDuration", "infusionDatetimeInput"]

  connect() {
    console.log("Form connected!")
    console.log("Result target:", this.resultTarget)
  }

  validateAndSubmitForm(event) {
    event.preventDefault();
    console.log("Form submission triggered");
    this.clearErrors();

    let isValid = true;
    let validInputs = true;
    const actValuesMeasured = this.actValueMeasuredTargets;
    const actMeasurementTimes = this.actDatetimeInputTargets;

    // Check if all inputs are valid
    // Check if all ACT values are between 1 and 1000
    actValuesMeasured.forEach((actValueMeasured) => {
      if (actValueMeasured.value < 1 || actValueMeasured.value > 1000) {
        actValueMeasured.classList.add("border-red-500");
        validInputs = false;
      }
    });

    // Check if all ACT measurement times are filled
    actMeasurementTimes.forEach((actMeasurementTime) => {
      if (!actMeasurementTime.value) {
        actMeasurementTime.classList.add("border-red-500");
        validInputs = false;
      }
    });

    const patientWeight = this.patientWeightTarget;
    if (!patientWeight.value) {
      patientWeight.classList.add("border-red-500");
      console.log(validInputs, patientWeight.classList);
      // alert('Patient weight must be greater than 0.');

      // Custom error message for the input field but it doesn't work
      // patientWeight.setCustomValidity('Patient weight is required.');
      validInputs = false;
      console.log(validInputs);
    }

    const actTarget = this.actTargetTarget;
    if (!actTarget.value) {
      this.actTarget.classList.add("border-red-500");
      // alert('ACT target must be greater than 0.');
      validInputs = false;
    }

    const timesBetweenBolus = this.timesBetweenBolusTarget;
    if (!timesBetweenBolus.value) {
      this.timesBetweenBolus.classList.add("border-red-500");
      // alert('Times between bolus injections must be greater than 0.');
      validInputs = false;
    }

    // Check if all datetime inputs are in chronological order
    const actDatetimeInputs = this.actDatetimeInputTargets.map(input => new Date(input.value));
    console.log(actDatetimeInputs);
    for (let i = 1; i < actDatetimeInputs.length; i++) {
      // Check if the ACT values are in chronological order
      // Check if the time difference between the first and last ACT value is less than 4.5 hours
      if (actDatetimeInputs[i] <= actDatetimeInputs[i - 1] || actDatetimeInputs[actDatetimeInputs.length - 1] - actDatetimeInputs[0] > 36000000) {
        isValid = false;
        console.log(actDatetimeInputs[i], actDatetimeInputs[i - 1]);
        console.log(actDatetimeInputs[actDatetimeInputs.length - 1] - actDatetimeInputs[0]);
        console.log("Validation failed at index:", i);
        alert('Measured ACT Values must be in chronological order and within 4.5 hours.');
        break;
      }
    }

    const bolusDatetimeInputs = this.bolusDatetimeInputTargets.map(input => new Date(input.value));
    console.log(bolusDatetimeInputs);
    for (let i = 1; i < bolusDatetimeInputs.length; i++) {
      if (bolusDatetimeInputs[i] <= bolusDatetimeInputs[i - 1] || bolusDatetimeInputs[bolusDatetimeInputs.length - 1] - bolusDatetimeInputs[0] > 36000000) {
        isValid = false;
        alert('Heparin bolus injections must be in chronological order and within 4.5 hours.');
        break;
      }
    }

    const infusionDatetimeInputs = this.infusionDatetimeInputTargets.map(input => new Date(input.value));
    console.log(infusionDatetimeInputs);
    for (let i = 1; i < infusionDatetimeInputs.length; i++) {
      if (infusionDatetimeInputs[i] <= infusionDatetimeInputs[i - 1] || infusionDatetimeInputs[infusionDatetimeInputs.length - 1] - infusionDatetimeInputs[0] > 36000000) {
        isValid = false;
        alert('Heparin infusions must be in chronological order and within 4.5 hours.');
        break;
      }
    }

    if (!isValid || !validInputs) {
      const redBorderElement = document.querySelector('.border-red-500');
      if (redBorderElement) {
        console.log('Scrolling into view:', redBorderElement);
        alert ('Please fill in all required fields.');
        redBorderElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (isValid && validInputs) {
      console.log("Validation passed, submitting form");
      this.saveSession(event);
      this.submitForm(event);
    }
  }

  clearErrors() {
    const actValuesMeasured = this.actValueMeasuredTargets;
    const actMeasurementTimes = this.actDatetimeInputTargets;

    actValuesMeasured.forEach((actValueMeasured, index) => {
      actValueMeasured.classList.remove("border-red-500");
    });

    actMeasurementTimes.forEach((actMeasurementTime, index) => {
      actMeasurementTime.classList.remove("border-red-500");
    });

    this.patientWeightTarget.classList.remove("border-red-500");
    this.actTargetTarget.classList.remove("border-red-500");
    this.timesBetweenBolusTarget.classList.remove("border-red-500");
  }

  submitForm(event) {
    // event.preventDefault()
    // Get form data
    const form = event.target
    console.log(form)

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

    // Show and hide loading gif while waiting for the promise
    function showLoading() {
      const loadingGif = document.getElementById('loading-gif');
      const computing = document.getElementById('computing');

      if (loadingGif) {
        loadingGif.style.display = 'block';
        computing.style.display = 'block';

        const targetRect = loadingGif.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Check if the target is completely or partially below the viewport
        if (targetRect.top >= viewportHeight || targetRect.bottom > viewportHeight) {
          console.log('Scrolling into view:', loadingGif);
          loadingGif.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          console.log('Target is already in view.');
        }
      } else {
        console.error('loadingGif is not defined.');
      }
    }

    // Function to hide the loading GIF
    function hideLoading() {
      const loadingGif = document.getElementById('loading-gif');
      const computing = document.getElementById('computing');

      if (loadingGif) {
        loadingGif.style.display = 'none';
        computing.style.display = 'none';
      }
    }

    // Show the loading GIF before sending the request
    showLoading();

    // Send AJAX request to the backend without reloading the page
    fetch('/calculate', resquestDetails)
    .then(response => response.json())

    // Handle the response
    .then(data => {
      console.log(data);

      const displayMapping = {
        ld_new_for_infusion: { cellId: "new-inf-ld", ciCellId: "new-inf-ld-ci", unit: "UI", ci: true, smallCellId: "new-inf-ld-small", smallCiCellId: "new-inf-ld-ci-small" },
        infusion_new: { cellId: "new-inf-rate", ciCellId: "new-inf-rate-ci", unit: "UI/h", ci: true, divide_by_500: true, smallCellId: "new-inf-rate-small", smallCiCellId: "new-inf-rate-ci-small" },
        new_infusion_time: { cellId: "new-inf-time", ciCellId: "new-inf-time-ci", unit: "minutes", ci: true, smallCellId: "new-inf-time-small", smallCiCellId: "new-inf-time-ci-small" },
        ld_new: { cellId: "new-int-ld", ciCellId: "new-int-ld-ci", unit: "UI", ci: true, smallCellId: "new-int-ld-small", smallCiCellId: "new-int-ld-ci-small" },
        bolus_new: { cellId: "new-int-mb", ciCellId: "new-int-mb-ci", unit: "UI", ci: true, smallCellId: "new-int-mb-small", smallCiCellId: "new-int-mb-ci-small" },
        bolus_total: { cellId: "new-int-total", unit: "UI", smallCellId: "new-int-total-small" },
        new_bolus_time: { cellId: "new-int-time", ciCellId: "new-int-time-ci", unit: "minutes", ci: true, smallCellId: "new-int-time-small", smallCiCellId: "new-int-time-ci-small" },
        deltaT_minutes: { cellId: "new-int-mb-delta-t-minutes", unit: "minutes", delta: true, smallCellId: "new-int-mb-delta-t-minutes-small" },
        plot_intermittent: { label: "", unit: "", special: "image" },
        plot_continuous: { label: "", unit: "", special: "image" }
      };

      const formatContent = (config, value) => {
        if (config.divide_by_500) {
          return {
            main: `${value[0]} ${config.unit}`,
            ci: `[${value[1]} : ${value[2]}]`,
            rate500: `${(value[0] / 500).toFixed(2)}`
          };
        } else if (config.ci) {
          return {
            main: `${value[0]} ${config.unit}`,
            ci: `[${value[1]} : ${value[2]}]`
          };
        } else if (config.delta) {
          return {
            main: `New MB every ${value} min`
          }
        } else {
          return {
            main: `${value} ${config.unit}`
          };
        }
      };

      const imageContainer = document.getElementById('image-container');
      if (imageContainer) {
        imageContainer.innerHTML = '';
      } else {
        console.error('Image container not found.');
      }

      Object.entries(data.result).forEach(([key, value]) => {
        const config = displayMapping[key];

        if (config && config.special === "image") {
          const img = document.createElement('img');
          img.src = value;
          img.className = "w-full h-auto max-w-full shadow-md lg:w-1/2 rounded-2xl";
          if (imageContainer) {
            imageContainer.appendChild(img);
          }
        }

        if (config) {
          const content = formatContent(config, value);

          if (config.cellId) {
            const cellElement = document.getElementById(config.cellId);
            if (cellElement) {
              cellElement.textContent = content.main;
            } else {
              console.error(`Element with ID ${config.cellId} not found.`);
            }
          }
          if (config.ciCellId) {
            const ciCellElement = document.getElementById(config.ciCellId);
            if (ciCellElement) {
              ciCellElement.textContent = content.ci;
            } else {
              console.error(`Element with ID ${config.ciCellId} not found.`);
            }
          }
          if (config.divide_by_500) {
            const rate500Element = document.getElementById("new-inf-rate-500");
            if (rate500Element) {
              rate500Element.textContent = content.rate500;
            } else {
              console.error(`Element with ID new-inf-rate-500 not found.`);
            }
          }

          // Update small table cells
          if (config.smallCellId) {
            const smallCellElement = document.getElementById(config.smallCellId);
            if (smallCellElement) {
              smallCellElement.textContent = content.main;
            } else {
              console.error(`Element with ID ${config.smallCellId} not found.`);
            }
          }
          if (config.smallCiCellId) {
            const smallCiCellElement = document.getElementById(config.smallCiCellId);
            if (smallCiCellElement) {
              smallCiCellElement.textContent = content.ci;
            } else {
              console.error(`Element with ID ${config.smallCiCellId} not found.`);
            }
          }
          if (config.divide_by_500) {
            const rate500Element = document.getElementById("new-inf-rate-500-small");
            if (rate500Element) {
              rate500Element.textContent = content.rate500;
            } else {
              console.error(`Element with ID new-inf-rate-500 not found.`);
            }
          }
        }
      });

      hideLoading();

      if (this.resultTarget) {
        console.log('Scrolling into view:', this.resultTarget);
        this.resultTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.error('resultTarget is not defined.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Hide the loading GIF in case of an error
      hideLoading();
    })
  }


  transformFormData(originalFormData) {
    const newFormData = new FormData();
    let actValuesMeasured = [];
    let actMeasurementTimes = [];
    let heparinsBolusGiven = [];
    let heparinsBolusTimes = [];
    let heparinsInfusionRatesGiven = [];
    let heparinsInfusionTimes = [];
    let heparinsInfusionDurations = [];

    // Iterate over original FormData
    originalFormData.forEach((value, key) => {
      console.log(key, value)
      if (key === "[acts][act_value_measured]") {
        actValuesMeasured.push(value);
      } else if (key === "[acts][act_measurement_time]") {
        actMeasurementTimes.push(value);
      } else if (key === "[heparins][bolus_given]"){
        heparinsBolusGiven.push(value);
      } else if (key === "[heparins][bolus_time]"){
        heparinsBolusTimes.push(value);
      } else if (key === "[heparins][infusion_rate_given]"){
        heparinsInfusionRatesGiven.push(value);
      } else if (key === "[heparins][infusion_time]"){
        heparinsInfusionTimes.push(value);
      } else if (key === "[heparins][infusion_duration]"){
        heparinsInfusionDurations.push(value);
      } else {
        newFormData.append(key, value);
      }
    });

    // Append the arrays to the new FormData
    newFormData.append("act_values_measured", actValuesMeasured);
    newFormData.append("act_measurement_times", actMeasurementTimes);
    newFormData.append("bolus_given", heparinsBolusGiven);
    newFormData.append("bolus_times", heparinsBolusTimes);
    newFormData.append("infusion_rates_given", heparinsInfusionRatesGiven);
    newFormData.append("infusion_times", heparinsInfusionTimes);
    newFormData.append("infusion_durations", heparinsInfusionDurations);

    return newFormData;
  }

  saveSession(event) {
    console.log("Save session triggered");
    console.log("Event:", event);
    localStorage.clear();
    const formData = [];

    // Get all form data
    const patientWeight = this.patientWeightTarget.value;
    const actTarget = this.actTargetTarget.value;
    const timesBetweenBolus = this.timesBetweenBolusTarget.value;

    // Get all ACT values and ACT measurement times
    const actValuesMeasured = [];
    this.actValueMeasuredTargets.forEach((actValueMeasured) => {
      actValuesMeasured.push(actValueMeasured.value);
    });
    const actMeasurementTimes = [];
    this.actDatetimeInputTargets.forEach((actDatetimeInput) => {
      actMeasurementTimes.push(actDatetimeInput.value);
    });

    // Get all heparins bolus injections and their times
    const heparinsBolus = [];
    this.bolusGivenTargets.forEach((bolusGiven) => {
      heparinsBolus.push(bolusGiven.value);
    });
    const bolusTimes = [];
    this.bolusDatetimeInputTargets.forEach((bolusDatetimeInput) => {
      bolusTimes.push(bolusDatetimeInput.value);
    });

    // Get all heparins infusions and their times
    const heparinsInfusions = [];
    this.infusionRateGivenTargets.forEach((infusionRateGiven) => {
      heparinsInfusions.push(infusionRateGiven.value);
    });
    const infusionTimes = [];
    this.infusionDatetimeInputTargets.forEach((infusionDatetimeInput) => {
      infusionTimes.push(infusionDatetimeInput.value);
    });
    const infusionDurations = [];
    this.infusionDurationTargets.forEach((infusionDuration) => {
      infusionDurations.push(infusionDuration.value);
    });

    // Push all form data to the formData array
    formData.push({ patientWeight: patientWeight });
    formData.push({ actTarget: actTarget });
    formData.push({ timesBetweenBolus: timesBetweenBolus });

    // Push all ACT values and ACT measurement times to the formData array
    formData.push({ actValuesMeasured: actValuesMeasured });
    formData.push({ actMeasurementTimes: actMeasurementTimes });

    // Push all heparins bolus injections and their times to the formData array
    formData.push({ heparinsBolus: heparinsBolus });
    formData.push({ bolusTimes: bolusTimes });

    // Push all heparins infusions and their times to the formData array
    formData.push({ heparinsInfusions: heparinsInfusions });
    formData.push({ infusionTimes: infusionTimes });
    formData.push({ infusionDurations: infusionDurations });

    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form data saved to local storage");
  }

  loadSession() {
    console.log("Load session triggered");
    const formData = JSON.parse(localStorage.getItem("formData"));
    console.log("Form data loaded from local storage:", formData);

    if (formData) {
      // Set all form data
      this.patientWeightTarget.value = formData[0].patientWeight;
      this.actTargetTarget.value = formData[1].actTarget;
      this.timesBetweenBolusTarget.value = formData[2].timesBetweenBolus;

      // Set all ACT values and ACT measurement times
      console.log("actValuesMeasured", formData[3].actValuesMeasured);
      console.log("children", this.actValuesTarget.children);
      if (formData[3].actValuesMeasured.length > 1 && this.actValuesTarget.querySelectorAll('.act-row').length !== formData[3].actValuesMeasured.length) {
        for (let i = 1; i < formData[3].actValuesMeasured.length; i++) {
          const row = document.createElement("div");
          row.classList.add("act-row", "lg:flex", "lg:items-center");
          row.innerHTML = `
            <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
              <div class="flex flex-row w-full">
                <label for="_acts_act_value_measured" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Measured ACT values</label>
                <input placeholder="seconds" type="number" name="[acts][act_value_measured]" data-form-handler-target="actValueMeasured" id="_acts_act_value_measured" min="1" max="1000" class="out-of-range:border-red-500 w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
              </div>
              <div class="flex flex-row w-full">
                <label for="_acts_act_measurement_time" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Time</label>
                <input type="datetime-local" data-form-handler-target="actDatetimeInput" name="[acts][act_measurement_time]" id="_acts_act_measurement_time" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
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
          `;
          this.actValuesTarget.appendChild(row);
          const rows = this.actValuesTarget.querySelectorAll('.act-row')
          console.log("rows", rows)
          updateMoveableButtons(rows);
        }
      }
      console.log("Start the process of setting the values");
      formData[3].actValuesMeasured.forEach((actValueMeasured, index) => {
        this.actValueMeasuredTargets[index].value = actValueMeasured;
      });
      formData[4].actMeasurementTimes.forEach((actMeasurementTime, index) => {
        this.actDatetimeInputTargets[index].value = actMeasurementTime;
      });

      // Set all heparins bolus injections and their times
      if (formData[5].heparinsBolus.length > 1 && this.bolusValuesTarget.querySelectorAll('.bolus-row').length !== formData[5].heparinsBolus.length) {
        for (let i = 1; i < formData[5].heparinsBolus.length; i++) {
          const row = document.createElement("div");
          row.classList.add("bolus-row", "lg:flex", "lg:items-center");
          row.innerHTML = `
            <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
              <div class="flex flex-row w-full">
                <label for="_heparins_bolus_given" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Heparin bolus injection</label>
                <input placeholder="Total UI per shot" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given" min="1" data-form-handler-target="bolusGiven" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
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
          `;
          this.bolusValuesTarget.appendChild(row);
          const rows = this.bolusValuesTarget.querySelectorAll('.bolus-row')
          console.log("rows", rows)
          updateMoveableButtons(rows);
        }
      }
      formData[5].heparinsBolus.forEach((heparinBolus, index) => {
        this.bolusGivenTargets[index].value = heparinBolus;
      });
      formData[6].bolusTimes.forEach((bolusTime, index) => {
        this.bolusDatetimeInputTargets[index].value = bolusTime;
      });

      // Set all heparins infusions and their times
      if (formData[7].heparinsInfusions.length > 1 && this.infusionValuesTarget.querySelectorAll('.infusion-row').length !== formData[7].heparinsInfusions.length) {
        for (let i = 1; i < formData[7].heparinsInfusions.length; i++) {
          const row = document.createElement("div");
          row.classList.add("infusion-row", "lg:flex", "lg:items-center");
          row.innerHTML = `
            <div class="flex lg:flex-row flex-col lg:items-center lg:gap-2 lg:my-2 lg:text-base text-sm gap-0.5 my-0.5 w-full">
              <div class="flex flex-row w-full">
                <label for="_heparins_infusion_rate_given" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Heparin infusion</label>
                <input placeholder="IR (UI per hour)" type="number" data-form-handler-target="infusionRateGiven" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given" min="1" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
              </div>
              <div class="flex flex-row w-full">
                <label for="_heparins_infusion_duration" class="lg:text-base text-sm flex items-center lg:mr-2 mr-1">Duration</label>
                <input placeholder="minutes" type="number" data-form-handler-target="infusionDuration" name="[heparins][infusion_duration]" id="_heparins_infusion_duration" min="1" class="w-full max-w-full lg:flex-1 flex-shrink-1 rounded-lg border-2 border-quaternary bg-secondary-light text-secondary-dark lg:p-2 p-1 focus:border-icon-color-dark data-hj-allow lg:text-base text-xs">
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
          `;
          this.infusionValuesTarget.appendChild(row);
          const rows = this.infusionValuesTarget.querySelectorAll('.infusion-row')
          console.log("rows", rows)
          updateMoveableButtons(rows);
        }
      }

      // Set the values
      formData[7].heparinsInfusions.forEach((heparinInfusion, index) => {
        this.infusionRateGivenTargets[index].value = heparinInfusion;
      });
      formData[8].infusionTimes.forEach((infusionTime, index) => {
        this.infusionDatetimeInputTargets[index].value = infusionTime;
      });
      formData[9].infusionDurations.forEach((infusionDuration, index) => {
        this.infusionDurationTargets[index].value = infusionDuration;
      });
    }
  }
}
