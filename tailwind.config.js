module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "crimson": "#DC143C",
        "custom-gray": "#E3E3E3",
        "custom-light-gray": "rgb(161, 161, 161, 0.4)",
        "custom-dark-gray": "rgba(128, 128, 128, 0.8)",
        "custom-green": "rgb(39, 149, 108)",
        "custom-dark-cyan": "#008080",
      },
      boxShadow: {
        customShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)"
      },
    },
  },
  plugins: [],
}