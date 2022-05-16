/*
 * @Desc:存放 dev 和 prod 通用配置
 * @Author: 曾茹菁
 * @Date: 2022-01-29 11:37:07
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-05-16 09:59:32
 */
const path = require("path"),
  chalk = require("chalk"),
  ProgressBarPlugin = require("progress-bar-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  { VueLoaderPlugin } = require("vue-loader/dist/index");
module.exports = {
  entry: path.resolve(__dirname, "../src/main.js"), // 打包入口
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: path.resolve("src"),
        exclude: /node_modules/,
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
          "babel-loader?cacheDirectory=true",
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
    new CopyWebpackPlugin({
      patterns: [
        {
          // 从public中复制文件
          from: path.resolve(__dirname, "../public"),
          // 把复制的文件存放到dis里面
          to: path.resolve(__dirname, "../dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"), //  html 模板
      filename: "index.html", // 打包后输出的文件名
      title: "Yomuki", // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
      minify: {
        //压缩HTML
        collapseWhitespace: true, //删除空格
        removeComments: true, //干掉注释
      },
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
  // 缓存
  cache: {
    // 将缓存类型设置为文件系统
    type: "filesystem",
    buildDependencies: {
      // 推荐在 webpack 配置中设置 cache.buildDependencies.config: [__filename] 来获取最新配置以及所有依赖项
      config: [__filename],
    },
  },
};
