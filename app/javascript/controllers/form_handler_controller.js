import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["form", "result"]

  connect() {
    console.log("Form connected!")
  }

  submitForm(event) {
    event.preventDefault()

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

    // Send AJAX request to the backend without reloading the page
    fetch('/calculate', resquestDetails)
    .then(response => response.json())

    // Handle the response
    .then(data => {
      console.log(data);

      this.resultTarget.innerHTML = '';

      const header = document.createElement('h3');
      header.textContent = 'Results:';
      header.className = "text-2xl font-semibold text-left text-gray-800";
      this.resultTarget.appendChild(header);

      const displayMapping = {
        ld_new_for_infusion: { label: "New loading dose", unit: "UI", ci: true },
        infusion_new: { label: "New infusion rate", unit: "UI/h", ci: true, divide_by_500: true },
        new_infusion_time: { label: "New infusion in", unit: "minutes", ci: true },
        ld_new: { label: "New loading dose", unit: "UI", ci: true },
        bolus_new: { label: "New maintenance bolus", unit: "UI", ci: true },
        bolus_total: { label: "Total injection (loading dose + maintenance bolus)", unit: "UI" },
        new_bolus_time: { label: "New injection in", unit: "minutes", ci: true },
        plot: { label: "", unit: "", special: "image" },
      };

      const formatContent = (config, value) => {
        if (config.divide_by_500) {
          return `${config.label}: ${value[0]} ${config.unit}, with 95% CI: [${value[1]} : ${value[2]}] ${config.unit}, or infusin rate/500 : ${(value[0] / 500).toFixed(2)} ${config.unit}`;
        } else if (config.ci) {
          return `${config.label}: ${value[0]} ${config.unit}, with 95% CI: [${value[1]} : ${value[2]}] ${config.unit}`;
        } else {
          return `${config.label}: ${value} ${config.unit}`;
        }
      };

      const continuousDosingHeader = document.createElement('p');
      continuousDosingHeader.innerHTML = '<strong>Continuous dosing strategy:</strong>';
      this.resultTarget.appendChild(continuousDosingHeader);

      Object.entries(data.result).forEach(([key, value]) => {
        const config = displayMapping[key];
        if (config) {
          if (key === "ld_new") {
            const lineBreak = document.createElement('br');
            this.resultTarget.appendChild(lineBreak);

            const intermittentDosingHeader = document.createElement('p');
            intermittentDosingHeader.innerHTML = '<strong>Intermittent dosing strategy:</strong>';
            this.resultTarget.appendChild(intermittentDosingHeader);
          }

          if (config.special === "image") {
            const img = document.createElement('img');
            img.src = value;
            img.className = "w-2/3 rounded-2xl";
            this.resultTarget.appendChild(img);
          } else {
            const p = document.createElement('p');
            p.textContent = formatContent(config, value);
            this.resultTarget.appendChild(p);
          }
        }
      });
      this.resultTarget.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
