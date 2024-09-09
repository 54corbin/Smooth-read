const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup.js", // This is just an example, adjust to your file structure
    background: "./src/background.js",
    content: "./src/content.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // E.g., popup.js, background.js, contentScript.js
  },
  experiments: {
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.wasm$/,
        type: "webassembly/async",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name][ext]" },
        { from: "src/assets/dioxus/smooth-read_bg.wasm", to: "[name][ext]" },
        // { from: 'assets', to: 'assets' },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".wasm"],
  },
  devtool: "cheap-module-source-map",
  mode: "development",
};
