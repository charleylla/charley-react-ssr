const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { alias } = require("./alias");

module.exports = {
  entry:"",
  output:{},
  module:{},
  resolve:{
    alias,
    mainFields: ["jsnext:main", "browser", "main"]
  },
  externals:[],
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ]
}