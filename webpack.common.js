
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    bootstrapSCSSEntry: {
      import: "./src/js/bootstrapSCSSEntry.js",
      filename: "js/bootstrapSCSSEntry.[contenthash].js",
    },
    bootstrapJSEntry: {
      import: "./src/js/bootstrapJSEntry.js",
      filename: "js/bootstrapJSEntry.[contenthash].js",
    },
    main: { 
      import: "./src/js/main.js", 
      filename: "js/main.[contenthash].js",
    },
  },
  output: {
    filename: "resources/js/bundle.[contenthash].js",
    path: `${__dirname}/dist`, 
    assetModuleFilename: "img/[name].[contenthash][ext][query]",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: "./src/index.html", 
      inject: "body",
      chunks: ["bootstrapSCSSEntry", "bootstrapJSEntry", "main"],
      filename: "index.html", 
    }),
    new MiniCssExtractPlugin({ 
      filename: "css/[name].[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/img", to: "img" },
        { from: "./src/robots.txt", to: "robots.txt" }
      ],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run postcss actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // postcss plugins, can be exported to postcss.config.js
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
