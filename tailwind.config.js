const app = [
  {
    name: 'app',
    colors: {
      primary: '#ff5a60',
      secondary: '#ff9d47',
      'custom-primary': '#ff5a60',
      'custom-placeholder-color': '#808080'
    }
  }
];

module.exports = {
  theme: {
    fontFamily: {
      body: ['Montserrat-Medium'],
      bold: ['Montserrat-Bold'],
      hairline: ['Montserrat-Regular'],
      light: ['Montserrat-light'],
      display: ['Montserrat-Medium', 'sans-serif']
    },
    extend: {
      colors: app[0].colors,
      boxShadow: {
        header: '0 3px 5px 0px rgba(0, 0, 0, .4)'
      },
      spacing: {
        'form-separate': '5rem'
      },
      minHeight: {
        'form-separate-switch': '6rem'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')]
};
