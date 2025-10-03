import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  fontFamily: {
    sans: ["Raleway", "sans-serif"],
    serif: ["Merriweather", "serif"],
    cursive: ["whitelisa", "WindSong", "cursive"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("autoprefixer"),
  ],
} satisfies Config

