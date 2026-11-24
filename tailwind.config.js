/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0A0D14',
          card: '#10141E',
          'card-hover': '#161B29',
          border: '#1E2538',
          'border-light': '#2A344D',
          muted: '#8E9BB5',
          text: '#F3F5F9',
        },
        brand: {
          purple: {
            DEFAULT: '#8B5CF6',
            hover: '#7C3AED',
            glow: 'rgba(139, 92, 246, 0.35)',
            subtle: 'rgba(139, 92, 246, 0.1)',
          },
          blue: {
            DEFAULT: '#3B82F6',
            hover: '#2563EB',
            glow: 'rgba(59, 130, 246, 0.35)',
            subtle: 'rgba(59, 130, 246, 0.1)',
          },
          cyan: {
            DEFAULT: '#06B6D4',
            glow: 'rgba(6, 182, 212, 0.35)',
            subtle: 'rgba(6, 182, 212, 0.1)',
          },
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
