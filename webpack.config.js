const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BASE_URL = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_URL + "main.js",
    recipe: BASE_URL + "recipe.js",
    ingredient: BASE_URL + "ingredient.js",
    comment: BASE_URL + "comment.js",
    like: BASE_URL + "like.js",
    ingredientList: BASE_URL + "ingredient-list.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
