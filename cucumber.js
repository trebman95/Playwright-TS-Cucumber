module.exports = {
    default: "--require-module ts-node/register --require './steps/**/*.ts' --require './hooks/**/*.ts' --format @cucumber/pretty-formatter",
    "cucumberautocomplete.steps": [
        "steps/*.ts",
        "steps/**/*.ts"
    ],
    "cucumberautocomplete.syncfeatures": "features/*.feature"
};