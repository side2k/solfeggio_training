module.exports = {
  purge: [
    "src/index.html",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.js",
    "src/**/*.jsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(["disabled"]),
  },
  plugins: [require("@tailwindcss/forms")],
};
