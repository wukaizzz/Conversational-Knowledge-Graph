import { plugin } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './public/**/*.{html,vue,js}',
    './src/components/ui/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {
      height: {
        "header-height": "var(--header-height)",
      },
      colors: {
        "token-text-primary": "var(--text-primary)",
        "token-surface-hover": "var(--surface-hover)",
        "token-text-tertiary": "var(--text-tertiary)",
        "token-main-surface-primary":"var(--main-surface-primary)"
        "token-bg-primary":"var(--bg-primary)"
      },
      screens: {
        tall: {
          raw: '(min-height:900px)',
        }
        // slow: {
        //   raw: '(max-height:540px)',
        // }
      }
    },
  },
  plugins: [
  ]
}