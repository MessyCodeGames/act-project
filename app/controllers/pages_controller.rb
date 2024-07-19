class PagesController < ApplicationController
  def home
  end

  def calculate
    weight = params[:var1]
    act_values = params[:var2].split(",")
    # Convert form data of dates as string to DateTime objects for calculations
    act_times = params[:var3].split(",").map { |time_string| DateTime.parse(time_string)}

    p "Le poids= #{weight}"

    if act_times.nil?
      p "act_times is nil"
    else
      p "ACT times before transformations are= #{act_times}"
    end

    # Transform act Times in minutes
    p "Intermediate results: "
    act_times_minutes = act_times.each_with_index.map do |time, i|
      if i == 0
        0
      else
        p "Time #{i}, difference between #{time} and #{act_times[0]}= #{(time - act_times[0])}, soit en minutes (*1440) = #{((time - act_times[0]) * 1440).to_i}"
        ((time - act_times[0]) * 1440).to_i
      end
    end

    if act_times_minutes.nil?
      p "act_times_minutes is nil"
    else
      p "ACT times after transformations are= #{act_times_minutes}"
    end

    # Path to the R script
    script_path = Rails.root.join('lib', 'scripts', 'script.R').to_s

    # Execute the R script with parameters
    output = `Rscript #{script_path} #{weight} #{act_values.join(",")} #{act_times_minutes.join(",")}`
    # Capture the result
    @result = output.strip

    # Render the result as JSON
    render json: { result: @result }
  end
end
