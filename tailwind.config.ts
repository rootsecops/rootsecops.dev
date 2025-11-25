
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
       fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        headline: ['var(--font-pixel)', 'monospace'],
        pixel: ['var(--font-pixel)', 'monospace'],
        special: ['var(--font-special)', 'monospace'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "noise-reveal": {
          '0%': { 'clip-path': 'inset(100% 0 0 0)', opacity: 0 },
          '5%': { 'clip-path': 'inset(90% 0 5% 0)', opacity: 1 },
          '15%': { 'clip-path': 'inset(10% 0 80% 0)' },
          '25%': { 'clip-path': 'inset(95% 0 2% 0)' },
          '35%': { 'clip-path': 'inset(40% 0 55% 0)' },
          '50%': { 'clip-path': 'inset(20% 0 30% 0)' },
          '65%': { 'clip-path': 'inset(98% 0 1% 0)' },
          '80%': { 'clip-path': 'inset(15% 0 5% 0)' },
          '90%': { 'clip-path': 'inset(80% 0 10% 0)' },
          '100%': { 'clip-path': 'inset(0 0 0 0)', opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "noise-reveal": "noise-reveal 2s ease-out forwards",
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
