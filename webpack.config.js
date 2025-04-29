const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/bg.js",
    content_script: "./src/script.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  watch: true,
  externals: {
    browser: "browser",
  },
  devtool: false,
  plugins: [
    new copyWebpackPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
};
