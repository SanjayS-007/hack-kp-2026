/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Layered-depth navy (remapped to premium tokens)
        navy: {
          950: '#060b18', // root base
          900: '#08101f',
          850: '#0b1424', // surface-1 (cards)
          800: '#101b30', // surface-2 (nested)
          700: '#16233c', // surface-3 (popovers/active)
          600: '#22304d',
        },
        surface: {
          1: '#0b1424',
          2: '#101b30',
          3: '#16233c',
        },
        cyan: {
          accent: '#22d3ee',
        },
        accent2: '#818cf8',
        risk: {
          a: '#f43f5e',
          b: '#f59e0b',
          c: '#eab308',
        },
        ok: '#34d399',
        review: '#38bdf8',
        ink: {
          hi: '#e7edf7',
          mid: '#9fb0c7',
          low: '#64748b',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        label: '0.08em',
      },
      boxShadow: {
        glow: '0 0 20px rgba(34, 211, 238, 0.25)',
        'glow-sm': '0 0 10px rgba(34, 211, 238, 0.2)',
        'elev-2': '0 8px 24px rgba(2, 6, 17, 0.45)',
        'elev-3': '0 16px 48px rgba(2, 6, 17, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-top': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'edge-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.15' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'fade-in': 'fade-in 0.42s cubic-bezier(.16,1,.3,1)',
        'slide-in-top': 'slide-in-top 0.26s cubic-bezier(.16,1,.3,1)',
        blink: 'blink 1s step-end infinite',
        'edge-pulse': 'edge-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
