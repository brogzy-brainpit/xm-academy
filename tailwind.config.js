// /** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      keyframes: {
    'color-fade': {
      '0%': { color: '#000' },
      '50%': { color: '#ff6600' },
      '100%': { color: '#000' },
    },
  },
  animation: {
    'color-fade': 'color-fade 3s ease-in-out infinite',
  },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
         fontSize:{
           'heading': 'clamp(2.2em, 12vw, 9em)',
           'heading2': 'clamp(38px, 8vw, 80px)',
           'heading3': 'clamp(20px, 3vw, 38px)',
           'display': 'clamp(130px, 33vw, 490px)',
           'para': 'clamp(1em, 1vw, 1.3em)',
        'button': 'clamp(14px, 3.5vw, 18px)',
      },
      lineHeight:{
         'regular': 'clamp(24px, 3vw, 32px)',
         'display': 'clamp(70px, 30vw, 400px)',
        'button': 'clamp(14px, 3.5vw, 18px)',
        'heading': 'clamp(60px, 10vw, 90px)',
        'footer': 'clamp(38px, 9vw, 80px)',
        'heading2': 'clamp(48px, 8vw, 84px)',
        'para': 'clamp(18px, 1vw, 24px)',
      },
      colors:{
         'brand-text':"#1c2218",
        'brand-text-dark':"#f7f0bc",
        'brand-accent':"rgb(116, 97, 195)", //accent for links, hover state 
        'brand-secondaryx':"#FDEB87", //orange best
        'brand-secondary':"#10B981", //emerald best
        'brand-secondary':"#16a34a", //blue best  #10B981
        'brand-background':"#f7fbe2",
        'brand-backgroundz':"#CFCFCF",
        'brand-background-dark':"#1c2218",
      },
      fontFamily:{
        'body':["var(--font-body)", "Arial"],
        'custom': ["var(--font-custom)", "serif"],
      }
    },
  },
 plugins: [],
};
