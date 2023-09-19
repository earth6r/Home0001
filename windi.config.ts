import { defineConfig } from 'windicss/helpers'
import { COLORS, SCREENS } from './lib/globals'

const colors = Object.entries(COLORS).reduce((acc, [key, value]) => {
  acc[key] = value
  return acc
}, {})
const screens = Object.entries(SCREENS).reduce((acc, [key, value]) => {
  acc[key] = `${value}px`
  return acc
}, {})

const config = defineConfig({
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      screens,
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif', 'arial-unicode'],
        serif: ['ui-serif', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      fontSize: { base: '13px' },
      spacing: {
        x: 'var(--space-x)',
        xhalf: 'var(--space-x-half)',
        xdouble: 'var(--space-x-double)',
        xlg: 'var(--space-x-lg)',
        y: 'var(--space-y)',
        yhalf: 'var(--space-y-half)',
        ydouble: 'var(--space-y-double)',
        ylg: 'var(--space-y-lg)',
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
      zIndex: {
        auto: 'auto',
        behind: -1,
        base: 1,
        above: 2,
        header: 3,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
})

export default config
