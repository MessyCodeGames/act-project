class PagesController < ApplicationController
  def home
  end

  def calculate
    var1 = params[:var1]
    var2 = params[:var2]

    # Path to your R script
    script_path = Rails.root.join('lib', 'scripts', 'script.R')

    # Execute the R script with parameters
    output = `Rscript #{script_path} #{var1} #{var2}`

    # Capture the result
    @result = output.strip

    # Render the result as JSON
    render json: { result: @result }

    # require "rinruby"
    # R.eval "print('Hello from R')"

    # Les deux variables récupérées depuis le formulaire
    # var1 = params[:var1].to_i
    # var2 = params[:var2].to_i

    # Un script R qui fait une simple addition
    # Avec la définition de la méthode, comme en Ruby presque
    # Puis l'utilisation de la méthode avec les deux variables mises dans l'objet res
    # Fin du script
    # R.pull du res pour pouvoir l'utiliser dans Ruby
    # R.eval <<-RSCRIPT
    #   simple_addition <- function(var1, var2) {
    #     return (var1 + var2)
    #   }
    #   res <- simple_addition(#{var1}, #{var2})
    # RSCRIPT

    # @result = R.pull("res")
    # render :home
  end
end
