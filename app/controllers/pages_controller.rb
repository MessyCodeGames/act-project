class PagesController < ApplicationController
  def home
  end

  def calculate
    weight = calculate_params[:patient_weight]
    act_target = calculate_params[:act_target]
    delta_t = (calculate_params[:delta_t].to_f / 60).to_s

    act_values_measured = calculate_params[:act_values_measured].split(",")
    act_measurement_times = calculate_params[:act_measurement_times].split(",").map { |time_string| DateTime.parse(time_string) }
    act_times_minutes = act_measurement_times.each_with_index.map do |time, i|
      i == 0 ? 0 : ((time - act_measurement_times[0]) * 1440).to_i
    end

    bolus_given = calculate_params[:bolus_given].split(",")
    bolus_times_minutes = []
    if bolus_given.empty?
      bolus_given = ["0"]
      bolus_times_minutes = ["0"]
    else
      bolus_times = calculate_params[:bolus_times].split(",").map { |time_string| DateTime.parse(time_string) }
      bolus_times_minutes = bolus_times.map { |time| ((time - act_measurement_times[0]) * 1440).to_i }
    end

    infusion_rates_given = calculate_params[:infusion_rates_given].split(",")
    infusion_times_minutes = []
    infusion_durations = []
    if infusion_rates_given.empty?
      infusion_rates_given = ["0"]
      infusion_times_minutes = ["0"]
      infusion_durations = ["0"]
    else
      infusion_times = calculate_params[:infusion_times].split(",").map { |time_string| DateTime.parse(time_string) }
      infusion_times_minutes = infusion_times.map { |time| ((time - act_measurement_times[0]) * 1440).to_i }
    end

    # Path to the R script
    script_path = Rails.root.join('lib', 'scripts', 'intermittent_continuous_models.R').to_s

    # Prepare arguments
    args = [
      script_path,
      weight,
      act_target,
      delta_t,
      act_values_measured.join(","),
      act_times_minutes.join(","),
      bolus_given.join(","),
      bolus_times_minutes.join(","),
      infusion_rates_given.join(","),
      infusion_times_minutes.join(","),
      infusion_durations.join(",")
    ]

    # Execute the R script with parameters using Open3
    output, status = Open3.capture2("Rscript", *args.map(&:to_s))

    if status.success?
      # Capture the result
      @result = JSON.parse(output.strip)

      # Render the result as JSON
      render json: { result: @result }
    else
      render json: { error: "Failed to execute R script" }, status: :unprocessable_entity
    end
  end

  private

  def calculate_params
    params.permit(
      :authenticity_token,
      :patient_weight,
      :act_target,
      :delta_t,
      :act_values_measured,
      :act_measurement_times,
      :bolus_given,
      :bolus_times,
      :infusion_rates_given,
      :infusion_times,
      :infusion_durations
    )
  end
end
