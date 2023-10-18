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
      },
      screens,
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif', 'arial-unicode'],
        serif: ['ui-serif', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      fontSize: { base: '13px' },
      letterSpacing: {
        body: '0.005em',
      },
      spacing: {
        x: 'var(--space-x)',
        xhalf: 'var(--space-x-half)',
        xdouble: 'var(--space-x-double)',
        xlg: 'var(--space-x-lg)',
        y: 'var(--space-y)',
        yhalf: 'var(--space-y-half)',
        ydouble: 'var(--space-y-double)',
        ylg: 'var(--space-y-lg)',
        menu: 'var(--space-menu)',
        input: 'var(--input-size)',
        block: 'var(--space-block)',
        btnx: 'var(--btn-space-x)',
        btny: 'var(--btn-space-y)',
        header: 'var(--header-height)',
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
        '.border-bottom': {
          borderBottom: '1.5px solid black',
        },
        '.header-gradient': {
          background:
            'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
        },
        '.mobile-landing': {
          fontSize: '4.5vw',
          lineHeight: '1.2',
          '@screen md': {
            fontSize: '2.6vw',
          },
        },
        '.home-svg': {
          '@screen md': {
            maxWidth: '4vw',
            width: '3vw',
          },
        },
      })
    },
  ],
} satisfies Config
