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
