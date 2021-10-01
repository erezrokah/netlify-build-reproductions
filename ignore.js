const process = require('process');

if (process.env.NETLIFY_IGNORE) {
  process.exitCode = 0;
} else {
  process.exitCode = 1;
}
