const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/views/**/*.html.erb'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary': '#A6BCCA',
        'secondary': '#B0D7D6',
        'tertiary': '#E5BA6C',
        'quaternary': '#B0D7D6',
        'icon-color': '#004661',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(183deg, rgba(249,249,249,1) 0%, rgba(176,215,214,1) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
