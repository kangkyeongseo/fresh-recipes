const path = require("path");

const BASE_URL = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_URL + "main.js",
    recipe: BASE_URL + "recipe.js",
    ingredient: BASE_URL + "ingredient.js",
  },
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
