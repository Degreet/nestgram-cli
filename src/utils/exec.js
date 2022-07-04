const { exec: execSync } = require('child_process');
const { promisify } = require('util');
const exec = promisify(execSync);
module.exports = { exec };
