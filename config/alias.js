const { resolve } = require("./bundle");
exports.alias = {
  "@src":resolve("src"),
  "@config":resolve("config"),
  "@static":resolve("static"),
  "@dist":resolve("dist"),
  "@client":resolve("src/client"),
  "@server":resolve("src/server"),
  "@core":resolve("src/core"),
}