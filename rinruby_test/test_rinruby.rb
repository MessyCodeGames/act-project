require 'rinruby'

begin
  R.eval "print('Hello from R')"
  puts "Rinruby executed successfully."
rescue => e
  puts "Rinruby execution failed: #{e.message}"
end
