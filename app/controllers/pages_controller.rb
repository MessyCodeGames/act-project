class PagesController < ApplicationController
  def home
  end

  def calculate
    require "rinruby"

    var1 = params[:var1].to_i
    var2 = params[:var2].to_i

    R.eval <<RSCRIPT
      simple_addition <- function(var1, var2) {
        return (var1 + var2)
      }
      res <- simple_addition('{var1}, #{var2}')
    RSCRIPT

    @result = R.pull("res")
    render :home
  end
end
