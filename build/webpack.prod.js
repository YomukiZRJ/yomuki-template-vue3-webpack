/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-01-29 11:37:02
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-01-29 13:39:17
 */
const path = require("path"),
  { merge } = require("webpack-merge"),
  common = require("./webpack.base.js"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {},
  plugins: [
    new CleanWebpackPlugin(), // 每次打包的时候，都会把 dist 目录清空，防止文件变动后，还有残留一些老的文件，以及避免一些缓存问题。
  ],
  output: {
    filename: "js/[name].[contenthash].js", //contenthash 若文件内容无变化，则contenthash 名称不变
    path: path.resolve(__dirname, "../dist"),
  },
});
