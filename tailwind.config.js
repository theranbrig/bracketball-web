module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        prussianLight: '#374F71',
        prussian: '#1d3557',
        prussianDark: '#041C3E',
        celadonLight: '#5F95B7',
        celadon: '#457b9d',
        celadonDark: '#2C6284',
        celadonTransparent: '#457b9df3',
        powderLight: '#C2F4F6',
        powder: '#a8dadc',
        powderDark: '#8FC1C3',
        honeydew: '#f1faee',
        honeydewTransparent: '#f1faee84',
        imperialLight: '#FF5360',
        imperial: '#e63946',
        imperialDark: '#CD202D',
      },
      height: {
        desktopNavHeight: '76px',
        desktopFullBody: 'calc(100vh - 76px)',
        minGridHeight: '240px',
        gridItemHeight: '120px',
      },
      width: {
        button: '240px',
        toastButton: '80px',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      },
    },
    fontFamily: {
      logo: ['Graduate', '-apple-system', 'sans-serif'],
      title: ['Comfortaa', '-apple-system', 'sans-serif'],
      body: ['Noto Sans KR', 'sans-serif'],
      number: ['Orbitron', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
