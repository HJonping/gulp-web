# 用gulp搭建的web开发小框架，适用简单web官网项目

## 安装依赖 
```
推荐使用yarn安装
yarn install  /npm install
```

### 配置
```
相应的文件和目录需要和gulp配置里面一样，不一致需要自己修改，如下图
├─.babelrc
├─.gitignore
├─gulpfile.babel.js
├─package.json
├─README.md
├─yarn.lock
├─src
|  ├─styles
|  |   ├─index.scss
|  |   ├─product.scss
|  |   ├─common
|  |   |   ├─_base.scss
|  |   |   ├─_mixins.scss
|  |   |   └_variable.scss
|  ├─static
|  |   ├─images
|  |   |   ├─bg_1.jpg
|  |   |   ├─icon
|  |   |   |  └icon_top.png
|  ├─scripts
|  |    ├─index.js
|  |    ├─product.js
|  |    ├─modules
|  |    |    ├─plugin
|  |    |    |   ├─jquery-3.6.1.min.js
|  |    |    |   ├─jquery-tab.js
|  |    |    |   └jquery-to-top.js
|  |    |    ├─common
|  |    |    |   └index.js
|  ├─pages
|  |   ├─index.html
|  |   └product.html
|  ├─include
|  |    ├─footer.html
|  |    └nav.html
├─dist
|  ├─20221111.zip
|  ├─styles
|  |   ├─index copy.css
|  |   ├─index.css
|  |   └product.css
|  ├─static
|  |   ├─images
|  |   |   ├─bg_1 copy.jpg
|  |   |   ├─bg_1.jpg
|  |   |   ├─icon
|  |   |   |  ├─icon_top copy 2.png
|  |   |   |  ├─icon_top copy.png
|  |   |   |  └icon_top.png
|  ├─scripts
|  |    ├─case.js
|  |    ├─index.js
|  |    └product.js
|  ├─pages
|  |   ├─index copy.html
|  |   ├─index.html
|  |   └product.html
```

### 执行命令
```
yarn serve / npm run serve  运行开发环境
yarn build:dev 编译打包文件，dev开发环境会生成源码映射，方面调试,开发完之后需要运行yarn build 重新编译，去掉生成的sourcemaps注释
yarn build 生产环境打包，编译文件，不会生成 sourcemaps源码文件 (生产环境需要运行此命令) 

```

