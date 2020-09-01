module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        prussian: '#1d3557',
        celadon: '#457b9d',
        celadonTransparent: '#457b9df3',
        powder: '#a8dadc',
        honeydew: '#f1faee',
        honeydewTransparent: '#f1faee84',
        imperial: '#e63946',
      },
      height: {
        desktopNavHeight: '76px',
        desktopFullBody: 'calc(100vh - 76px)',
        minGridHeight: '240px',
      },
      width: {
        button: '240px',
      },
    },
    fontFamily: {
      logo: ['Graduate', '-apple-system', 'sans-serif'],
      title: ['Comfortaa', '-apple-system', 'sans-serif'],
      body: ['Noto Sans KR', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
