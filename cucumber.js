module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require hooks/**/*.ts',
    '--require steps/**/*.ts',
    '--publish-quiet'
  ].join(' ')
};