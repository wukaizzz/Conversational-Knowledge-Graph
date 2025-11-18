import { plugin } from 'postcss';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './public/**/*.{html,vue,js}',
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
    // plugin(function ({ addUtilities }) {
    //   addUtilities({
    //     /* 禁止浏览器原生拖拽行为 */
    //     '.no-draggable': {
    //       '-webkit-user-select': 'none',
    //       '-moz-user-select': 'none',
    //       '-ms-user-select': 'none',
    //       'user-select': 'none',
    //     }
    //   })
    // })
  ]
}