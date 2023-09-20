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
      },
      transitionDuration: {
        snail: 'var(--speed-snail)',
        xslow: 'var(--speed-xslow)',
        slow: 'var(--speed-slow)',
        normal: 'var(--speed-normal)',
        fast: 'var(--speed-fast)',
      },
      shortcuts: {
        container: 'w-full mx-auto px-x',
      },
      zIndex: {
        auto: 'auto',
        behind: '-1',
        base: '1',
        above: '2',
        header: '3',
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
      })
    },
  ],
} satisfies Config