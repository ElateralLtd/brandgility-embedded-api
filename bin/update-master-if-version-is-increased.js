#!/usr/bin/env node
/* eslint-disable no-console, import/no-dynamic-require, max-len, consistent-return */

const path = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');
const semver = require('semver');

// Constants
const scriptPath = process.argv[1];
const scriptDir = path.dirname(scriptPath);
const scriptFileNameWithoutExt = path.basename(scriptPath, '.js');
const utilLabel = scriptFileNameWithoutExt;
const projectDir = path.dirname(scriptDir);

// Functions
const log = (...args) => console.info(`${utilLabel}:`, ...args);
const getProjectVersion = () => JSON.parse(
  readFileSync(`${projectDir}/package.json`).toString(),
).version;
const execute = (command, returnStdout = false) => {
  log(`\n${command}`);

  if (returnStdout) {
    return execSync(command).toString();
  } else {
    execSync(command, { stdio: [0, 1, 2] });
  }
};

// Get current branch name
const branchName = execute('git rev-parse --abbrev-ref HEAD', true).replace(/\n/, '');
// Get branch and master package version
const branchVersion = getProjectVersion();

execute('git checkout master');
const masterVersion = getProjectVersion();

execute(`git checkout ${branchName}`);

// Compare versions
log('Branch package version:', branchVersion);
log('Master package version:', masterVersion);
if (!semver.gt(branchVersion, masterVersion)) {
  log('Branch package version is not greater than master package version.');
  log('Done.');
  process.exit();
}

// User
execute(`git config user.email '${utilLabel}@elateral-dev.io'`);
execute(`git config user.name '${utilLabel}'`);

// Merge
execute('git checkout master');
const mergeMessage = `${utilLabel}: Automatic merge ${branchVersion} version from "${branchName}" to "master"`;

execute(`git merge --no-edit -m '${mergeMessage}' ${branchName}`);

// Tag
const tagMessage = `${utilLabel}: Package version ${branchVersion}`;
const tagName = `v${branchVersion}`;

execute(`git tag -a ${tagName} -m '${tagMessage}'`);

// Push
execute('git push origin master');
execute(`git push origin ${tagName}`);
