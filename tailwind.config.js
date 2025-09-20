/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 80% 50%)',
        accent: 'hsl(160 80% 50%)',
        bg: 'hsl(230 15% 10%)',
        surface: 'hsl(230 15% 15%)',
        textPrimary: 'hsl(0 0% 95%)',
        textSecondary: 'hsl(0 0% 75%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(0, 0%, 0%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
