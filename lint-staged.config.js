module.exports = {
  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': 'eslint --config .eslintrc --fix',
  // Format MarkDown and JSON
  '**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`,
}
