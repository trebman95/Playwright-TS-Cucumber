// cucumber.js
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      './steps/**/*.ts', 
      './hooks/**/*.ts'
    ],
    format: ['@cucumber/pretty-formatter']
  }
};


    //default: '--require-module ts-node/register --require "./steps/**/*.ts" --require ./hooks/**/*.ts --format @cucumber/pretty-formatter'
