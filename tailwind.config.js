/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)'
        },
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-success-foreground)'
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)'
        },
        error: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-error-foreground)'
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)'
        },
        card: {
          DEFAULT: 'var(--color-card)',
          foreground: 'var(--color-card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)'
        },
        /* Named Cafe Palette */
        'garden-green': '#2D4A27',
        'forest-dark': '#1a2d17',
        'chai-brown': '#8B4513',
        'chai-light': '#A0522D',
        'gold-warm': '#D4AF37',
        'gold-bright': '#F0C948',
        'warm-ivory': '#FAF7F0',
        'earth-brown': '#6B4226',
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
        playfair: ['Cormorant Garamond', 'serif'], // alias
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(45, 74, 39, 0.08)',
        'elevated': '0 8px 32px rgba(45, 74, 39, 0.14)',
        'premium': '0 20px 60px rgba(45, 74, 39, 0.18)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.35)',
        'gold-xl': '0 8px 40px rgba(212, 175, 55, 0.5)',
        'inner-soft': 'inset 0 2px 8px rgba(45, 74, 39, 0.08)',
        'glass': '0 8px 32px rgba(45, 74, 39, 0.1), inset 0 1px 0 rgba(255,255,255,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-left': 'slideInLeft 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideInRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
        'float-leaf': 'float-leaf linear infinite',
        'steam': 'steam-rise ease-in-out 3s infinite',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.6)' }
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'float-leaf': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.4' },
          '100%': { transform: 'translateY(-100vh) rotate(25deg)', opacity: '0' }
        },
        'steam-rise': {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.6' },
          '50%': { transform: 'translateY(-30px) scaleX(1.2)', opacity: '0.3' },
          '100%': { transform: 'translateY(-60px) scaleX(0.8)', opacity: '0' }
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
      },
      transitionTimingFunction: {
        'natural': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(15,30,12,0.92) 0%, rgba(45,74,39,0.75) 40%, rgba(139,69,19,0.6) 100%)',
        'earthy': 'linear-gradient(135deg, #2D4A27 0%, #1a2d17 100%)',
        'warm-section': 'linear-gradient(180deg, #FAF7F0 0%, #F5EFE0 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%)',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ]
}