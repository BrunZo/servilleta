/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '.katex-display': {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              textAlign: 'center',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
