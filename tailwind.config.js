module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        prussian: '#1d3557',
        celadon: '#457b9d',
        powder: '#a8dadc',
        honeydew: '#f1faee',
        imperial: '#e63946',
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
};
