import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1400px',
      '3xl': '1500px',
      '4xl': '1780px',
    },
    extend: {
      fontFamily: {
        urbanist: ["Urbanist", "sans-serif"],
        lato: ['var(--font-lato)'],
        satisfy: ['var(--font-satisfy)'],
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        66: "66%",
        88: "88%",
        70: "70%",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "5xl": "48px",
        h1: [
          '2.25rem',
          {
            lineHeight: '2.75rem',
          },
        ],
        h2: [
          '1.875rem',
          {
            lineHeight: '2.375rem',
          },
        ],
        h3: [
          '1.5rem',
          {
            lineHeight: '2rem',
          },
        ],
        h4: [
          '1.25rem',
          {
            lineHeight: '1.75rem',
          },
        ],
        h5: [
          '1.125rem',
          {
            lineHeight: '1.625rem',
          },
        ],
        h6: [
          '1rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        quote: [
          '1.125rem',
          {
            lineHeight: '1.75rem',
            fontWeight: '600',
          },
        ],
      },
      colors: {
        darkblack: {
          300: "#747681",
          400: "#2A313C",
          500: "#23262B",
          600: "#1D1E24",
          700: "#151515",
        },
        success: {
          50: "#D9FBE6",
          100: "#B7FFD1",
          200: "#4ADE80",
          300: "#22C55E",
          400: "#16A34A",
        },
        warning: {
          100: "#FDE047",
          200: "#FACC15",
          300: "#EAB308",
        },
        error: {
          50: "#FCDEDE",
          100: "#FF7171",
          200: "#FF4747",
          300: "#DD3333",
        },
        bgray: {
          50: "#FAFAFA",
          100: "#F7FAFC",
          200: "#EDF2F7",
          300: "#E2E8F0",
          400: "#CBD5E0",
          500: "#A0AEC0",
          600: "#718096",
          700: "#4A5568",
          800: "#2D3748",
          900: "#1A202C",
        },
        // orange: "#FF784B",
        red: {
          light: 'rgb(var(--red-light) / <alpha-value>)',
          lighter: 'rgb(var(--red-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--red-default) / <alpha-value>)',
          dark: 'rgb(var(--red-dark) / <alpha-value>)',
        },
        orange: {
          light: 'rgb(var(--orange-light) / <alpha-value>)',
          lighter: 'rgb(var(--orange-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--orange-default) / <alpha-value>)',
          dark: 'rgb(var(--orange-dark) / <alpha-value>)',
        },
        green: {
          light: 'rgb(var(--green-light) / <alpha-value>)',
          lighter: 'rgb(var(--green-lighter) / <alpha-value>)',
          DEFAULT: 'rgb(var(--green-default) / <alpha-value>)',
          dark: 'rgb(var(--green-dark) / <alpha-value>)',
        },
        bamber: {
          50: "#FFFBEB",
          100: "#FFC837",
          500: "#F6A723",
        },
        gray: {
          light: 'rgb(var(--gray-light) / <alpha-value>)',
          lighter: 'rgb(var(--gray-lighter) / <alpha-value>)',
          lightest: 'rgb(var(--gray-lightest) / <alpha-value>)',
          DEFAULT: 'rgb(var(--gray-default) / <alpha-value>)',
          dark: 'rgb(var(--gray-dark) / <alpha-value>)',
          1000: 'rgb(var(--gray-1000) / <alpha-value>)',
        },
        purple: "#936DFF",
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
      },
      textColor: {
        skin: {
          base: 'rgb(var(--gray-light) / <alpha-value>)',
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // keyframes: {
      //   blink: {
      //     '0%': { opacity: 0.2 },
      //     '20%': { opacity: 1 },
      //     '100%': { opacity: 0.2 },
      //   },
      //   scaleUp: {
      //     '0%': { transform: 'scale(0)' },
      //     '100%': { transform: 'scale(1)' },
      //   },
      // },
      boxShadow: {
        card: '0px 0px 0px 1px rgba(35, 38, 59, 0.05), 0px 2px 4px rgba(35, 38, 59, 0.1)',
        'card-hover':
          '0px 0px 0px 1px rgba(35, 38, 59, 0.05), 0px 3px 4px rgba(35, 38, 59, 0.1)',
        'card-two': '0px 8px 12px rgba(0, 0, 0, 0.08)',
        'menu-shadow': '0px 0px 8px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography'), require('@tailwindcss/forms')],
} satisfies Config

export default config