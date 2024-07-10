args <- commandArgs(trailingOnly = TRUE)

var1 <- as.numeric(args[1])
var2 <- as.numeric(args[2])

simple_addition <- function(var1, var2) {
  return (var1 + var2)
}

res <- simple_addition(var1, var2)
cat(res)
