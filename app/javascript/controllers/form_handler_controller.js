import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "result", "actValueMeasured", "patientWeight", "actTarget", "timesBetweenBolus", "actDatetimeInput", "bolusDatetimeInput", "infusionDatetimeInput"]

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
      if (actDatetimeInputs[i] <= actDatetimeInputs[i - 1]) {
        isValid = false;
        console.log("Validation failed at index:", i);
        alert('Measured ACT Values must be in chronological order.');
        break;
      }
    }

    const bolusDatetimeInputs = this.bolusDatetimeInputTargets.map(input => new Date(input.value));
    console.log(bolusDatetimeInputs);
    for (let i = 1; i < bolusDatetimeInputs.length; i++) {
      if (bolusDatetimeInputs[i] <= bolusDatetimeInputs[i - 1]) {
        isValid = false;
        alert('Heparin bolus injections must be in chronological order.');
        break;
      }
    }

    const infusionDatetimeInputs = this.infusionDatetimeInputTargets.map(input => new Date(input.value));
    console.log(infusionDatetimeInputs);
    for (let i = 1; i < infusionDatetimeInputs.length; i++) {
      if (infusionDatetimeInputs[i] <= infusionDatetimeInputs[i - 1]) {
        isValid = false;
        alert('Heparin infusions must be in chronological order.');
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
      if (loadingGif) {
        loadingGif.style.display = 'block';

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
      if (loadingGif) {
        loadingGif.style.display = 'none';
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
}
