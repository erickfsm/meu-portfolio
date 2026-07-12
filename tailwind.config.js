/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#08090C",
          soft: "#0C0E13",
        },
        panel: {
          DEFAULT: "#111319",
          soft: "#161922",
          raised: "#1B1E27",
        },
        line: "rgba(255,255,255,0.08)",
        gold: {
          DEFAULT: "#C9A961",
          soft: "#E8D9B5",
          dim: "#8A7645",
        },
        ivory: "#F4F2EC",
        mist: {
          DEFAULT: "#9BA0AC",
          dim: "#5B606C",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Manrope", "Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.97)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        floatIn: {
          "0%": { opacity: 0, transform: "translateY(12px) scale(0.96)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        scaleIn: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        floatIn: "floatIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 1.4s infinite linear",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
