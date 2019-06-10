const fs = require('fs');
const isIgnored = require('@commitlint/is-ignored').default;
const commitLintConfig = require('./.commitlintrc');

const commitHeaderPattern = commitLintConfig.parserPreset.parserOpts.headerPattern;
const commitMessage = fs.readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf8').toString();
const commitHeader = commitMessage.split('\n')[0];

if (!isIgnored(commitMessage) && !commitHeaderPattern.test(commitHeader)) {
  console.error('Commit header does not match shape: id:<id> <type>(<scope>): <subject>');
  process.exitCode = 1;
}
