module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
      colors:{
        transparent: 'transparent',
        current: 'currentColor',
        'forestGreen':'#264653',
        'mintGreen':'#2A9D8f',
        'yellowFellow':'#e9c46a',
        'orangeDoorHinge':'#f4a261',
        'clayRed':'#e76f51',
        'dark-olive-green': '#606c38ff',
        'kombu-green': '#283618ff',
        'cornsilk': '#fefae0ff',
        'earth-yellow': '#dda15eff',
        'liver-dogs': '#bc6c25ff',
      },
      fontFamily:{
        'montSerrat':'Montserrat',
        'quicksand':'Quicksand',
        'roboto':'Roboto'
      }
    }    
  },
  plugins: [],
}
