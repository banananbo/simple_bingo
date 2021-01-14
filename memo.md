## HTML作成
```public/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TEST</title>
    <script src="js/app.js"></script>
  </head>
  <body>
    <div id="app">test app</div>
  </body>
</html>
```
WEBサーバーで表示確認

## yarn初期化
```
yarn init -y
```

```package.json
{
  "name": "test5",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```
パッケージ管理の準備が出来た。

## webpack準備
### yarnによるwebpackのインストール

```
yarn add --dev webpack webpack-cli
```

```package.json
{
  "name": "test4",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "webpack": "^5.13.0",
    "webpack-cli": "^4.3.1"
  }
}
```
node_modules というディレクトリが作られ、webpack利用に必要なパッケージがインストールされる。
これらの詳細の情報は、同時に作成されたyarn.lockに記録される。
### テスト用のjsの準備
```src/app.js
let test = ()=> {alert("webpack test");};
test();
```

### webpackの設定ファイル準備
```webpack.config.js
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: env,
}
```

### webpack実行
npxとは、パッケージ管理しているnodeモジュールを簡単に実行できる仕組み
node_modules/.bin 以下の実行ファイルを実行できる。
```sh
npx webpack --mode=development
asset app.js 802 bytes [emitted] (name: main)
./src/app.js 49 bytes [built] [code generated]
webpack 5.14.0 compiled successfully in 137 ms
```
```src/js/app.js
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
eval("let test = ()=> {alert(\"webpack test\");};\ntest();\n\n//# sourceURL=webpack://test5/./src/app.js?");
/******/ })()
;
```
```
npx webpack --mode=production
```
```src/js/app.js
alert("webpack test");
```

### 
