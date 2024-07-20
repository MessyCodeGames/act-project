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

  data <- data.frame(times = actTimes,
                     acts = actValues)

  plot <- ggplot(data = data, aes(x = times, y = acts)) +
    geom_bar(stat = "identity", fill="steelblue") +
    theme_bw()

  # Save the plot to a temporary file
  temp_file <- tempfile(fileext = ".png")
  ggsave(temp_file, plot = plot, width = 3, height = 3, dpi = 300)

  # Encode the image
  encoded_image <- base64enc::dataURI(file = temp_file, mime = "image/png")

  resultList <- list(normalizedWeight = normalizedWeight,
                      sumActValues = sumActValues,
                      timePassed = timePassed,
                      plot = encoded_image)
  return(resultList)
}

output <- protoFunction(weight, actValues, actTimes)

json_output <- toJSON(output)
cat(json_output)
