/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#14532D',
          800: '#166534',
          900: '#0E3F22',
        },
        leaf: {
          DEFAULT: '#22C55E',
          600: '#16A34A',
        },
        sage: {
          DEFAULT: '#F0FDF4',
          200: '#DCFCE7',
          300: '#BBF7D0',
        },
        ink: '#0F172A',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -12px rgba(20,83,45,0.18)',
        lift: '0 2px 4px rgba(15,23,42,0.05), 0 20px 40px -16px rgba(20,83,45,0.3)',
      },
    },
  },
  plugins: [],
}
