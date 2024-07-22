import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "result", "actValues", "heparinsValues", "heparinsInfusions"]

  connect() {
    console.log("Form connected!")
  }

  addiction(event) {
    event.preventDefault()

    // Get form data
    const form = event.target
    console.log(form)

    // const var2 = form.querySelector('input[name="[acts][var2]"]').value
    // const var3 = form.querySelector('input[name="[acts][var3]"]').value
    // console.log(var2)
    // console.log(var3)

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

    // Send AJAX request to the backend without reloading the page
    fetch('/calculate', resquestDetails)
    .then(response => response.json())

    // Handle the response
    .then(data => {
      console.log(data);

      // Clear previous results
      this.resultTarget.innerHTML = '';

      // Create a header for the result
      const header = document.createElement('h3');
      header.textContent = 'Results:';
      this.resultTarget.appendChild(header);

      // Define a mapping for keys to display labels, units, and special handling
      const displayMapping = {
        ld_new: { label: "New loading dose", unit: "UI", ci: true },
        bolus_new: { label: "New bolus", unit: "UI", ci: true },
        bolus_total: { label: "Total injection", unit: "UI" },
        new_bolus_time: { label: "New injection in", unit: "minutes", ci: true },
        plot: { label: "", unit: "", special: "image" },
      };

      // Function to format text content based on the presence of confidence intervals
      const formatContent = (config, value) => {
        if (config.ci) {
          return `${config.label}: ${value[0]} ${config.unit}, with 95% CI: [${value[1]} : ${value[2]}] ${config.unit}`;
        } else {
          return `${config.label}: ${value} ${config.unit}`;
        }
      };

      // Iterate over each key-value pair in the result object
      Object.entries(data.result).forEach(([key, value]) => {
        const config = displayMapping[key];
        if (config) {
          if (config.special === "image") {
            const img = document.createElement('img');
            img.src = value;
            this.resultTarget.appendChild(img);
          } else {
            const p = document.createElement('p');
            p.textContent = formatContent(config, value);
            this.resultTarget.appendChild(p);
          }
        }
      });
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

  // Add a new row to the ACT values form
  addActValues(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="_acts_act_value_measured">Valeur d'ACT mesurée</label>
      <input placeholder="seconds" type="number" name="[acts][act_value_measured]" id="_acts_act_value_measured">

      <label for="_acts_act_measurement_time">Temps</label>
      <input type="datetime-local" name="[acts][act_measurement_time]" id="_acts_act_measurement_time">
    `
    console.log("Add ACT row", this.actValuesTarget)
    this.actValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins values form
  addBolus(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="_heparins_bolus_given">Dose d'Heparin injectée</label>
      <input placeholder="UI total par dose" type="number" name="[heparins][bolus_given]" id="_heparins_bolus_given">

      <label for="_heparins_bolus_time">Temps</label>
      <input type="datetime-local" name="[heparins][bolus_time]" id="_heparins_bolus_time">
    `
    console.log("Add bolus row", this.heparinsValuesTarget)
    this.heparinsValuesTarget.appendChild(row)
  }

  // Add a new row to the heparins infusions form
  addInfusion(event) {
    event.preventDefault()
    const row = document.createElement("div")
    row.innerHTML = `
      <label for="_heparins_infusion_rate_given">Débit d'Heparin en perfusion</label>
      <input placeholder="Ui par heure" type="number" name="[heparins][infusion_rate_given]" id="_heparins_infusion_rate_given">

      <label for="_heparins_infusion_duration">Duration</label>
      <input placeholder="minutes" type="number" name="[heparins][infusion_duration]" id="_heparins_infusion_duration">

      <label for="_heparins_infusion_time">Heure de début</label>
      <input type="datetime-local" name="[heparins][infusion_time]" id="_heparins_infusion_time">
  `
    console.log("Add infusion row", this.heparinsInfusionsTarget)
    this.heparinsInfusionsTarget.appendChild(row)
  }
}
