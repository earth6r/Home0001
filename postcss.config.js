module.exports = {
  plugins: {
    'postcss-focus-visible': {},
    'postcss-hexrgba': {},
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config: './tailwind.config.ts' },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    autoprefixer: {},
  },
}
