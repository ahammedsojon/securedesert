import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import twAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      sm: "var(--fz-sm)",
      base: "var(--fz-base)",
      md: "var(--fz-md)",
      lg: "var(--fz-lg)",
      xl: "var(--fz-xl)",
      "2xl": "var(--fz-2xl)",
      "3xl": "var(--fz-3xl)",
    },
    extend: {
      fontFamily: {
        hHackout: ["var(--hHackout), serif"],
        tauri: ["var(--tauri), sans-serif"],
      },
      screens: {
        xs: "340px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        danger: "hsl(var(--danger))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        warning: "hsl(var(--warning))",
        help: "hsl(var(--help))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "foreground-alt": "hsl(var(--foreground-alt))",
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
      boxShadow: {
        glow: "0px 0px 4px 0px hsl(var(--primary)), 0px 0px 18px 0px hsl(var(--primary))",
        sm: "0 0 4px 0 hsl(var(--primary)), 0 0 8px 0 hsl(var(--primary))",
        md: "0 0 12px 0 hsl(var(--primary)), 0 0 8px 0 hsl(var(--primary))",
        lg: "0 0 16px 0 hsl(var(--primary)), 0 0 8px 0 hsl(var(--primary))",
        xl: "0 0 20px 0 hsl(var(--primary)), 0 0 8px 0 hsl(var(--primary))",
        "2xl": "0 0 24px 0 hsl(var(--primary)), 0 0 12px 0 hsl(var(--primary))",
        "3xl": "0 0 28px 0 hsl(var(--primary)), 0 0 12px 0 hsl(var(--primary))",
      },
      textShadow: {
        sm: "0 0 4px var(--tw-shadow-color)",
        DEFAULT: "0 0 8px var(--tw-shadow-color)",
        lg: "0 0 12px var(--tw-shadow-color)",
      },
      keyframes: {
        glow: {
          from: {
            filter: "drop-shadow(0 0 0px hsl(var(--primary)))",
          },
          to: {
            filter: "drop-shadow(0 0 15px hsl(var(--primary)))",
          },
        },
        scroll: {
          to: {
            transform: "translateX(-100%)",
          },
        },
      },
      animation: {
        "scroll-slow": "scroll 20s linear infinite",
        "scroll-fast": "scroll 10s linear infinite",
        spin: "none",
        glow: "none",
        // spin: "spin 15s linear infinite",
        // glow: "glow 1.5s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [
    twAnimate,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
} satisfies Config;
