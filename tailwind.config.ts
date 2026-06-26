
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Source Code Pro', 'monospace'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
      },
      colors: {
        background: '#050505',
        foreground: '#00f2ff',
        card: {
          DEFAULT: 'rgba(5, 5, 5, 0.8)',
          foreground: '#00f2ff',
        },
        popover: {
          DEFAULT: '#050505',
          foreground: '#00f2ff',
        },
        primary: {
          DEFAULT: '#00f2ff',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#ff0000',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: 'rgba(0, 242, 255, 0.1)',
          foreground: 'rgba(0, 242, 255, 0.4)',
        },
        accent: {
          DEFAULT: '#ff4d00',
          foreground: '#000000',
        },
        destructive: {
          DEFAULT: '#ff0000',
          foreground: '#FFFFFF',
        },
        border: 'rgba(0, 242, 255, 0.2)',
        input: 'rgba(0, 242, 255, 0.05)',
        ring: '#00f2ff',
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      keyframes: {
        'scan': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(0, 242, 255, 0.5))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 20px rgba(0, 242, 255, 0.8))' },
        },
        'bar-move': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.4' },
        }
      },
      animation: {
        'scan-line': 'scan 4s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bar-move': 'bar-move 3s linear infinite',
        'flicker': 'flicker 4s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
