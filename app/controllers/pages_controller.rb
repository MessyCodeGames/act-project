class PagesController < ApplicationController
  def home
  end

  def calculate
    weight = params[:patient_weight]
    act_target = params[:act_target]
    delta_t = params[:delta_t].to_f / 60

    act_values_measured = params[:act_values_measured].split(",")
    act_measurement_times = params[:act_measurement_times].split(",").map { |time_string| DateTime.parse(time_string)}
    act_times_minutes = act_measurement_times.each_with_index.map do |time, i|
      i == 0 ? 0 : ((time - act_measurement_times[0]) * 1440).to_i
    end

    bolus_given = params[:bolus_given].split(",")
    bolus_times_minutes = []
    if bolus_given.empty?
      bolus_given = ["0"]
      bolus_times_minutes = ["0"]
    else
      bolus_times = params[:bolus_times].split(",").map { |time_string| DateTime.parse(time_string)}
      bolus_times_minutes = bolus_times.map { |time| ((time - act_measurement_times[0]) * 1440).to_i }
    end

    infusion_rates_given = params[:infusion_rates_given].split(",")
    infusion_times_minutes = []
    infusion_durations = []
    if infusion_rates_given.empty?
      infusion_rates_given = ["0"]
      infusion_times_minutes = ["0"]
      infusion_durations = ["0"]
    else
      infusion_times = params[:infusion_times].split(",").map { |time_string| DateTime.parse(time_string)}
      infusion_times_minutes = infusion_times.map { |time| ((time - act_measurement_times[0]) * 1440).to_i }
      infusion_durations = params[:infusion_durations].split(",")
    end

    # Path to the R script
    script_path = Rails.root.join('lib', 'scripts', 'intermittent_continuous_models.R').to_s

    # Execute the R script with parameters
    output = `Rscript #{script_path} #{weight} #{act_target} #{delta_t} #{act_values_measured.join(",")} #{act_times_minutes.join(",")} #{bolus_given.join(",")} #{bolus_times_minutes.join(",")} #{infusion_rates_given.join(",")} #{infusion_times_minutes.join(",")} #{infusion_durations.join(",")}`

    # Capture the result
    @result = JSON.parse(output.strip)

    # Console log the result for debugging
    p "JSON parsed R output:"
    p "#{@result}"

    # Render the result as JSON
    render json: { result: @result }
  end
end
