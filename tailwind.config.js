module.exports = {
  content: ['./index.html', './**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',
        'black-a60': '#00000099',
        'black-a38': '#00000061',
        'black-a42': '#0000006B',
        'red-oddle': '#F44336',
      },
      screens: {
        mobile: {
          max: '428px',
        },
        tablet: {
          max: '1194px',
        },
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
  // plugins: [require('@tailwindcss/forms')],
};
