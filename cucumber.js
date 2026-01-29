module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["steps/**/*.ts", "hooks/**/*.ts"],
    format: ["json:report.json"]
  }
};
