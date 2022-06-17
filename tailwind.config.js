module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        'black-a60': '#00000099',
        'black-a38': '#00000061',
        'red-oddle': '#F44336',
      },
      fontFamily: {
        arsenal: ['Arsenal', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
