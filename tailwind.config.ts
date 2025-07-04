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
        textgray: '#999999',
        lightgray: '#DEDEDE',
        darkgray: '#E9E9E9',
        darkergray: '#C6C6C6',
        yellow: '#FAFF00',
      },
      textColor: {
        lightgray: '#999999',
      },
      screens,
      fontFamily: {
        sans: ['"Haas Grot"', 'Arial', 'sans-serif', 'arial-unicode'],
        sansArial: ['Arial', 'sans-serif', 'arial-unicode'],
        sansText: ['"Haas Grot Text"', 'Arial', 'sans-serif', 'arial-unicode'],
        sansDisp: [
          '"Haas Grot Display"',
          'Arial',
          'sans-serif',
          'arial-unicode',
        ],
        serif: ['ui-serif', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
      // clamps set between 420px and 1440px
      fontSize: {
        base: '14px',
        caption: ['10px', '1.2'],
        xs: ['14px', '1.2'], // small
        sm: ['14px', '1'], // read more
        md: ['16px', '1.2'], // body
        lg: ['16px', '0.9'], // h4
        bodyLg: ['21px', '1'], // large paragraph rich text
        card: ['24px', '0.9'], // property summary card
        header3: ['32px', '0.9'], // h3
        side: ['56px', '0.75'], // vertical text
        xl: ['clamp(2.5rem, 2.088rem + 1.569vw, 3.5rem)', '0.9'], // h2
        '2xl': ['clamp(3rem, 1.816rem + 4.51vw, 5.875rem)', '0.9'], // h1
      },
      letterSpacing: {
        details: '-0.02em',
        body: '-0.02em',
        header: '-0.03em',
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
        ytrio: 'var(--space-y-trio)',
        yquad: 'var(--space-y-quad)',
        menusm: 'var(--space-menu-sm)',
        menu: 'var(--space-menu)',
        fullmenu: 'var(--space-full-menu)',
        input: 'var(--input-size)',
        block: 'var(--space-block)',
        btn: 'var(--btn-height)',
        btnWidth: 'var(--btn-width)',
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
        menu: '5',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
          borderTop: '1.5px solid black',
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
        '.border-bottom--black': {
          borderBottom: '1px solid black',
        },
        '.border-bottom--gray': {
          borderBottom: `2px solid ${theme('backgroundColor.gray')}`,
        },
        '.border-bottom--textgray': {
          borderBottom: `2px solid ${theme('backgroundColor.textgray')}`,
        },
        '.text-h1': {
          fontFamily: theme('fontFamily.sansDisp'),
          fontSize: theme('fontSize.2xl'),
          fontWeight: '500',
          lineHeight: '0.9',
          letterSpacing: theme('letterSpacing.header'),
          textTransform: 'uppercase',
          fontFeatureSettings: `'case' on, 'cpsp' on`,
        },
        '.text-h1--bold': {
          fontSize: theme('fontSize.2xl'),
          fontWeight: '700',
          lineHeight: '0.9',
          letterSpacing: theme('letterSpacing.header'),
          textTransform: 'uppercase',
          fontFeatureSettings: `'case' on, 'cpsp' on`,
        },
        '.text-h2': {
          fontFamily: theme('fontFamily.sansDisp'),
          fontSize: theme('fontSize.xl'),
          fontWeight: '500',
          lineHeight: '0.9',
          letterSpacing: theme('letterSpacing.header'),
          textTransform: 'uppercase',
          fontFeatureSettings: `'case' on, 'cpsp' on`,
        },
        '.text-h2--bold': {
          fontFamily: theme('fontFamily.sansDisp'),
          fontSize: theme('fontSize.xl'),
          fontWeight: '700',
          lineHeight: '0.9',
          letterSpacing: theme('letterSpacing.header'),
          textTransform: 'uppercase',
          fontFeatureSettings: `'case' on`,
        },
        '.text-h3': {
          fontSize: theme('fontSize.header3'),
          fontWeight: '500',
          lineHeight: '0.9',
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          fontFeatureSettings: `'case' on`,
        },
        '.text-h4': {
          fontSize: theme('fontSize.xs'),
          fontWeight: '500',
          fontFamily: theme('fontFamily.sansText'),
          lineHeight: '0.9',
          letterSpacing: theme('letterSpacing.details'),
          textTransform: 'uppercase',
        },
        '.text-button': {
          fontSize: theme('fontSize.xs'),
          fontWeight: '500',
          textTransform: 'uppercase',
          lineHeight: '0.8',
        },
        '.text-side': {
          fontFamily: theme('fontFamily.sansDisp'),
          fontSize: theme('fontSize.side'),
          fontWeight: '500',
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.header'),
          lineHeight: '0.9',
          // letterSpacing: '-1.16px',
          fontFeatureSettings: `'case' on, 'cpsp' on`,
        },
      })
    },
  ],
} satisfies Config
