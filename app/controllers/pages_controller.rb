class PagesController < ApplicationController
  def home
  end

  def calculate
    weight = params[:var1]
    act_values = params[:var2].split(",")
    # Convert form data of dates as string to DateTime objects for calculations
    act_times = params[:var3].split(",").map { |time_string| DateTime.parse(time_string)}

    # Transform act Times in minutes
    act_times_minutes = act_times.each_with_index.map do |time, i|
      if i == 0
        0
      else
        ((time - act_times[0]) * 1440).to_i
      end
    end

    # Path to the R script
    script_path = Rails.root.join('lib', 'scripts', 'script.R').to_s

    # Execute the R script with parameters
    output = `Rscript #{script_path} #{weight} #{act_values.join(",")} #{act_times_minutes.join(",")}`

    # Capture the result
    @result = JSON.parse(output.strip)

    p "Raw R output: #{output}"
    p "JSON parsed R output: #{@result}"

    # Render the result as JSON
    render json: { result: @result }
  end
end
