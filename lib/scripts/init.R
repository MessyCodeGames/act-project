my_packages = c("ggplot2", "tidyr", "jsonlite", "base64enc", "remotes")

install_if_missing = function(p) {
  if (!p %in% installed.packages()[,"Package"]) {
    tryCatch({
      install.packages(p, dependencies = TRUE, quiet = TRUE)
      library(p, character.only = TRUE)
    }, error = function(e) {
      cat("Failed to install", p, "with error:", e$message, "\n")
    })
  }
}

invisible(sapply(my_packages, install_if_missing))
install.packages("MASS")
