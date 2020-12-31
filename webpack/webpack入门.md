# webpack入门

> webpack是一个现代的JavaScript应用的静态模块打包工具

## webpack安装

1. 安装webpack首先需要安装Node.js，使用Node.js自带的软件包管理工具npm

2. 使用`npm install webpack -g`命令全局安装webpack

   使用本地安装`npm install webpack --save-dev`

3. 使用`webpack -v`命令查看版本

## 基本使用

### 打包

使用`webpack ./src/main.js -o ./dist/bundle`命令对js文件进行打包

![成功信息](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201227011940.png)

成功后会在指定目录下生产`main.js`文件

打包后就可以在文件中引用。

---

通过编写`webpack.config.js`文件进行webpack的配置

```javascript
//获取当前路径
const path = require('path')
module.exports = {
  //指定入口
  entry: './src/main.js',
  //指定出口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
```

直接在目录中执行webpack也可以进行打包操作

![结果](https://study-1259382847.cos.ap-chongqing.myqcloud.com/picbed/20201227013557.png)

---

