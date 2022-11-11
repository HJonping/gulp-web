# gulp自动化

## 安装依赖 
```
推荐使用yarn安装
yarn install  /npm install
```

### 配置
```
相应的文件和目录需要和gulp配置里面一样，不一致需要自己修改，如下图
│  
├─include
│      footer.html
│      nav.html
│      
├─pages
│      case.html
│      product.html
│      service.html
│      
├─scripts
│  │  case.js
│  │  product.js
│  │  
│  └─modules
│      ├─common
│      │      index.js
│      │      
│      └─plugin
│              jquery-1.6.1.min.js
│              
├─static
│  └─images
│      │  bg_1.png
│      │  
│      └─icon
│              ability_icon_1.png
│              
└─styles
    │  case.scss
    │  product.scss
    │  service.scss
    │  
    └─common
            _base.scss
            _mixins.scss
            _variable.scss
```

### 执行命令
```
yarn serve / npm run serve  运行开发环境
yarn build:dev 编译打包文件，dev开发环境会生成源码映射，方面调试,开发完之后需要运行yarn build 重新编译，去掉生成的sourcemaps注释
yarn build 生产环境打包，编译文件，不会生成 sourcemaps源码文件 (生产环境需要运行此命令) 

```

