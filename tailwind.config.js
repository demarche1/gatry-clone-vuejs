const pallette = require("./pallete");

module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: pallette,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
