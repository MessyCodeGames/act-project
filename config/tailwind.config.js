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
        // 'primary': '#AEC2CD',
        // 'secondary': '#D9EBEF',
        // 'tertiary': '#E5BA6C',
        // 'quaternary': '#B0D7D6',
        // 'icon-color-dark': '#004661',
        // 'icon-color': '#B29790',

        'primary': '#ADD1BA',
        'secondary': '#e5f1db',
        'tertiary': '#fded8d',
        'quaternary': '#B0D7D6',
        'icon-color-dark': '#004661',
        'icon-color': '#B29790',
        'light-color': '#e7ddda',
        'very-light-color': '#f1eceb',
        'active-color': "#611B00",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(183deg, rgba(249,249,249,1) 0%, rgba(249,249,249,1) 39%, rgba(203,223,187,1) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
