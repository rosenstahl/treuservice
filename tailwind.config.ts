import type { Config } from "tailwindcss"
import { systemFontStack } from "./src/styles/fonts"
import animate from "tailwindcss-animate"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
          hover: 'var(--color-accent-hover)'
        },
        // Explizite Definition der Hintergrundfarbe
        background: '#FFFFFF',
        // Andere wichtige Farben die möglicherweise `background` verwenden
        card: '#FFFFFF',
        popover: '#FFFFFF',
        muted: {
          DEFAULT: '#F8FAFC',
          foreground: '#64748B'
        },
        border: '#E2E8F0'
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          ...systemFontStack.split(', ').map(font => 
            font.includes(' ') ? `"${font}"` : font
          )
        ],
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
      },
      fontSize: {
        'h1': ['var(--font-h1-size)', {
          lineHeight: 'var(--font-h1-line-height)',
          fontWeight: 'var(--font-h1-weight)',
        }],
        'h2': ['var(--font-h2-size)', {
          lineHeight: 'var(--font-h2-line-height)',
          fontWeight: 'var(--font-h2-weight)',
        }],
        'h3': ['var(--font-h3-size)', {
          lineHeight: 'var(--font-h3-line-height)',
          fontWeight: 'var(--font-h3-weight)',
        }],
        'body': ['var(--font-body-size)', {
          lineHeight: 'var(--font-body-line-height)',
          fontWeight: 'var(--font-body-weight)',
        }],
        'small': ['var(--font-small-size)', {
          lineHeight: 'var(--font-small-line-height)',
          fontWeight: 'var(--font-small-weight)',
        }],
      },
      letterSpacing: {
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
      },
      boxShadow: {
        subtle: 'var(--shadow-subtle)',
        medium: 'var(--shadow-medium)',
        strong: 'var(--shadow-strong)',
      },
      animation: {
        'fade-in': 'fadeIn 400ms ease-in',
        'slide-up': 'slideUp 300ms ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fly': 'fly 0.6s ease-in-out infinite alternate',
        'paper-plane-takeoff': 'paper-plane-takeoff 0.5s ease forwards',
        'text-slide': 'text-slide 0.5s ease forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        fly: {
          '0%': { transform: 'translateY(0.1em)' },
          '100%': { transform: 'translateY(-0.1em)' }
        },
        'paper-plane-takeoff': {
          '0%': { 
            transform: 'translateX(0) rotate(0deg) scale(1)'
          },
          '100%': { 
            transform: 'translateX(1.2em) rotate(45deg) scale(1.1)'
          }
        },
        'text-slide': {
          '0%': { 
            transform: 'translateX(0)'
          },
          '100%': { 
            transform: 'translateX(5em)'
          }
        }
      }
    }
  },
  plugins: [animate],
} satisfies Config

export default config