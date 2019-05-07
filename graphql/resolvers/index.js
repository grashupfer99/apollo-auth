const authResolver = require("./auth");
const churchesResolver = require("./churches");

const rootResolver = {
  ...authResolver,
  ...churchesResolver
};

module.exports = rootResolver;
