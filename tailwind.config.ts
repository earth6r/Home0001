import type { Config } from 'tailwindcss'
import { SCREENS } from './src/globals'

const screens = Object.entries(SCREENS).reduce((acc, [key, value]) => {
  acc[key] = `${value}px`
  return acc
}, {})

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        whitesmoke: '#F3F3F3',
        gray: '#EDEDED',
        lightgray: '#DEDEDE',
        darkgray: '#E9E9E9',
        yellow: '#FAFF00',
      },
      textColor: {
        lightgray: '#999999',
      },
      screens,
      fontFamily: {
        sans: ['"Haas Grot"', 'Arial', 'sans-serif', 'arial-unicode'],
        serif: ['ui-serif', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      fontSize: {
        base: '14px',
        xs: ['14px', '1.2'], // small
        sm: ['14px', '1'], // read more
        md: ['18px', '1.2'], // body
        lg: ['22.5px', '1'], // h3
        card: ['clamp(1.5rem, 0.95rem + 2.09vw, 2.625rem)', '0.85'], // property summary card
        xl: ['clamp(12px,10.5vw,54px)', '0.85'], // h2
        '2xl': ['clamp(1.5625rem, -1.234rem + 6.579vw, 4.6875rem)', '0.85'], // h1
      },
      letterSpacing: {
        details: '-0.02em',
        body: '-0.021em',
        header: '-0.02em',
      },
      spacing: {
        x: 'var(--space-x)',
        xhalf: 'var(--space-x-half)',
        xdouble: 'var(--space-x-double)',
        xlg: 'var(--space-x-lg)',
        y: 'var(--space-y)',
        yhalf: 'var(--space-y-half)',
        yquarter: 'var(--space-y-quarter)',
        ydouble: 'var(--space-y-double)',
        ylg: 'var(--space-y-lg)',
        menu: 'var(--space-menu)',
        fullmenu: 'var(--space-full-menu)',
        input: 'var(--input-size)',
        block: 'var(--space-block)',
        btn: 'var(--btn-height)',
        btnx: 'var(--btn-space-x)',
        btny: 'var(--btn-space-y)',
        header: 'var(--header-height)',
        gradient: 'var(--gradient-height)',
        wrap: 'var(--wrap)',
        wrap2xs: 'var(--wrap-2xs)',
        wrapxs: 'var(--wrap-xs)',
        wrapsm: 'var(--wrap-sm)',
        page: 'var(--space-page)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fade-in 250ms linear forwards',
        fadeInDelay: 'fade-in 250ms linear 600ms forwards',
      },
      transitionDuration: {
        snail: 'var(--speed-snail)',
        xslow: 'var(--speed-xslow)',
        slow: 'var(--speed-slow)',
        normal: 'var(--speed-normal)',
        fast: 'var(--speed-fast)',
      },
      zIndex: {
        auto: 'auto',
        back: '-2',
        behind: '-1',
        base: '1',
        above: '2',
        header: '3',
        modal: '4',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          paddingLeft: theme('spacing.x'),
          paddingRight: theme('spacing.x'),
          paddingBottom: theme('spacing.x'),
          width: '100%',
          maxWidth: '100%',
          '@screen md': {
            paddingLeft: theme('spacing.x'),
            paddingRight: theme('spacing.x'),
            paddingBottom: theme('spacing.x'),
          },
        },
        '.border-black': {
          border: '1px solid black',
        },
        '.border-top': {
          borderTop: '1px solid black',
        },
        '.border-left': {
          borderLeft: '1px solid black',
        },
        '.border-right': {
          borderRight: '1px solid black',
        },
        '.border-bottom': {
          borderBottom: '1.5px solid black',
        },
        '.header-gradient': {
          background:
            'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.96) 50%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0) 100%)',
        },
        '.modal-gradient': {
          background:
            'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0.96) 50%, rgba(255,255,255,0.8) 70%, rgba(255,255,255,0) 100%)',
        },
        '.mobile-landing': {
          fontSize: '7.9vw',
          lineHeight: '1.2',
          letterSpacing: '-0.03em',
          '@screen md': {
            fontSize: 'clamp(12px,2.5vw,40px)',
          },
        },
        '.text-title': {
          fontSize: '10.5vw',
          lineHeight: '1',
          leadingTrim: 'both',
          textEdge: 'cap',
          fontWeight: '800',
          letterSpacing: '-0.82px',
          textTransform: 'uppercase',
          '@screen md': {
            fontSize: 'clamp(12px,4.5vw,140px)',
            letterSpacing: '-7px',
          },
          '@screen lg': {
            fontSize: 'clamp(12px,8.2vw,140px)',
            letterSpacing: '-7px',
          },
        },
        '.home-svg': {
          width: '10.5vw',
          '@screen md': {
            maxWidth: '140px',
            width: '5vw',
          },
        },
        '.card-shadow': {
          boxShadow: '5px 5px 20px 0px rgba(0, 0, 0, 0.40)',
        },
      })
    },
  ],
} satisfies Config
