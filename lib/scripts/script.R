args <- commandArgs(trailingOnly = TRUE)

weight <- as.numeric(args[1]) # Integer
actValues <- as.numeric(unlist(strsplit(args[2], ",")))
actTimes <- as.numeric(unlist(strsplit(args[3], ",")))

protoFunction <- function(weight, actValues, actTimes) {
  packages <- c("ggplot2", "MASS", "tidyr", "jsonlite", "base64enc")

  package.check <- lapply(
    packages,
    FUN = function(x) {
      if (!require(x, character.only = TRUE)) {
        install.packages(x, dependencies = TRUE)
        library(x, character.only = TRUE)
      }
    }
  )

  normalizedWeight <- round(weight / 60, 2)

  sumActValues <- 0
  for (i in 1:length(actValues)) {
    sumActValues <- sumActValues + actValues[i]
  }

  timePassed <- actTimes[1]
  if (length(actTimes) > 1) {
    for (i in 2:length(actTimes)) {
      timePassed <- c(timePassed, (actTimes[i] - actTimes[1]))
    }
  }

  resultList <- list(normalizedWeight = normalizedWeight,
                      sumActValues = sumActValues,
                      timePassed = timePassed)
  return(resultList)
}

output <- protoFunction(weight, actValues, actTimes)

json_output <- toJSON(output)
cat(json_output)
