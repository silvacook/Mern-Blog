const flowbite = require("flowbite-react/tailwind");
const scrollbar = require("tailwind-scrollbar");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Use flowbite.content() directly
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    scrollbar, // Include the scrollbar plugin
    // No need to explicitly include @tailwindcss/line-clamp if using Tailwind CSS v3.3 or later
  ],
};
