// tailwind.config.js
module.exports = {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}', // adjust if needed
    ],
    theme: {
      extend: {
        keyframes: {
          slide: {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(300%)' },
          },
        },
        animation: {
          slide: 'slide 1.5s linear infinite',
        },
      },
    },
    plugins: [],
  }
  