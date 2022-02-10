/*
 * @Desc:存放 dev 和 prod 通用配置
 * @Author: 曾茹菁
 * @Date: 2022-01-29 11:37:07
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-02-10 09:54:14
 */
const path = require("path"),
  chalk = require("chalk"),
  ProgressBarPlugin = require("progress-bar-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { VueLoaderPlugin } = require("vue-loader/dist/index");
module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"), // 打包入口
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        include: path.resolve("src"),
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /.js$/, //对所有js后缀的文件进行编译
        include: path.resolve("src"), //表示在src目录下的.js文件都要进行一下使用的loader
        use: [
          "babel-loader",
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
        ],
      },
      // 在webpack5中，内置了资源模块（asset module），代替了file-loader和url-loader
      {
        test: /\.(png|jpe?g|gif|ico|bmp|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 转换成data-uri的条件
            maxSize: 10 * 1024, // 10kb
          },
        },
        generator: {
          filename: "images/[hash][ext][query]", // 指定生成目录名称
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/, //加载图片资源
      //   loader: "url-loader",
      //   type: "javascript/auto", //解决asset重复
      //   options: {
      //     esModule: false, //解决html区域,vue模板引入图片路径问题
      //     limit: 1000,
      //     name: "static/img/[name].[hash:7].[ext]",
      //   },
      // },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //加载视频资源
      //   loader: "url-loader",
      //   options: {
      //     limit: 10000,
      //     name: "static/media/[name].[hash:7].[ext]",
      //   },
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, //加载字体资源
      //   loader: "url-loader",
      //   options: {
      //     limit: 10000,
      //     name: "static/fonts/[name].[hash:7].[ext]",
      //   },
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"), //  html 模板
      filename: "index.html", // 打包后输出的文件名
      title: "Yomuki", // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
    // vue
    new VueLoaderPlugin(),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"], //省略文件后缀
    alias: {
      //配置别名
      "@": path.resolve(__dirname, "../src"),
    },
  },
};
