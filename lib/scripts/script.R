args <- commandArgs(trailingOnly = TRUE)

weight <- as.numeric(args[1]) # Integer
actValues <- as.numeric(unlist(strsplit(args[2], ",")))  # Array of int
actTimes <- as.numeric(unlist(strsplit(args[3], ",")))

protoFunction <- function(weight, actValues, actTimes) {
  # Libraries required, A TESTER PLUS TARD #
  packages = c("ggplot2", "MASS", "tidyr", "jsonlite")

  # Load or install & load needed libraries #
  package.check <- lapply(
    packages,
    FUN = function(x) {
    if (!require(x, character.only = TRUE)) {
      install.packages(x, dependencies = TRUE)
      library(x, character.only = TRUE)
      }
    }
  )

  # 1
  normalizedWeight <- weight/60

  # 2
  sumActValues <- 0
  for (i in 1:length(actValues)) {
    sumActValues <- sumActValues + actValues[i]
  }

  # 3
  timePassed <- actTimes[1]
  for (i in 2:length(actTimes)) {
    timePassed <- c(timePassed, (actTimes[i] - actTimes[1]))
  }

  # Result list
  resultList <- list(normalizedWeight = normalizedWeight, sumActValues = sumActValues, timePassed = timePassed)
  # The output consists in a list of 3 elements: a float, an int and an int array)
  return(resultList)
}

# Outputs #
output <- protoFunction(weight, actValues, actTimes)

# As the result is in a complex format, the output will be converted to JSON for Ruby
json_output <- jsonlite::toJSON(output)
cat(json_output)
