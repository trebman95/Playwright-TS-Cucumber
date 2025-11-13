module.exports = {
    default: `--require-module ts-node/register --require './support/**/*.ts' --require './steps/**/*.ts' --require './hooks/**/*.ts' --format @cucumber/pretty-formatter`
};