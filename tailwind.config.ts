import type { Config } from 'tailwindcss'

const config: Config = {
   content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
     themes: [
       {
         customLightTheme: {
           primary: '#4a00ff',
           'primary-content': '#d1dbff',
           secondary: '#ff00d3',
           'secondary-content': '#fff8fd',
           accent: '#00d7c0',
           'accent-content': '#00110e',
           'neutral': '#4B5563',
           'neutral-content': '#d7dde4',
           'base-100': '#ffffff',
           'base-200': '#f2f2f2',
           'base-300': '#e5e6e6',
           'base-content': '#1f2937',
         }
       }
     ]
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
}
export default config
