// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

module.exports = {
  '**/*.{js,ts,jsx,tsx}': [
    packageJson.scripts['eslint'],
    () => packageJson.scripts['tsc'], // https://github.com/okonet/lint-staged/blob/master/README.md#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
  ],
};
