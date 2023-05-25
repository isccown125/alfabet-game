const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname),
    },
    port: 3001,
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
};
