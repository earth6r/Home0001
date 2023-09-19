module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-focus-visible': {},
    'postcss-hexrgba': {},
    tailwindcss: { config: './tailwind.config.ts' },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': false,
      },
    },
    autoprefixer: {},
  },
}
