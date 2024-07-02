const flowbite = require("flowbite-react/tailwind");
const scrollbar = require("tailwind-scrollbar");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    scrollbar, // Include the scrollbar plugin
  ],
};
