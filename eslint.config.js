export default [
    {
      files: ['**/*.js'], // Specify the files ESLint should lint
      languageOptions: {
        ecmaVersion: 2022, // Use modern JavaScript syntax
        sourceType: 'module', // Enable ES modules
      },
      rules: {
        semi: ['error', 'always'], // Example rule: enforce semicolons
        quotes: ['error', 'single'], // Example rule: enforce single quotes
      },
    },
  ];
  