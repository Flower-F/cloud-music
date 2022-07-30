module.exports = {
  '**/*.{js,jsx,tsx,ts}': ['pnpm eslint', 'git add .'],
  '**/*.css': ['pnpm stylelint', 'git add .']
}
