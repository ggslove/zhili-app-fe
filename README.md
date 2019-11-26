# zhili-app-fe

## 多模块安装

git clone --recurse-submodules

然后使用 yarn install 安装包



## typescript IOC

[typescript Decorator & 元数据反射](https://qianduan.group/posts/59977ed1b963854f926adcec)
[InversifyJS](https://github.com/inversify/InversifyJS)

> Typescript 目前尚不支持参数的具体类型反射。Typescript 结合 reflect-metadata库 "emitDecoratorMetadata": true

#### nodejs 多个项目时，如何配置 launch.json 调试子项目代码

> tsconfig 中使用了 baseUrl 与 patshs 配置时，需要引入 tsconfig-paths/register
> 在 packages/commons路径下 node --nolazy -r ts-node/register -r tsconfig-paths/register  src/testpath.ts

- lanuch.json 配置
  
```javascript
{
  // 对于不同的 sub project 使用不同的配置，项目指定具体的项目，运行项目src下的文件
  "version": "0.2.0",
   "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Common ",
      "protocol": "inspector",
      "cwd": "${workspaceFolder}/packages/common",
      "args": ["src/${fileBasename}"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register","-r","tsconfig-paths/register"],
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "protocol": "inspector",
      "cwd": "${workspaceFolder}/packages/server",
      "args": ["src/${fileBasename}"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register","-r","tsconfig-paths/register"],
    }
  ]
}
```

#### typescript

- design:type  类装饰，能取到具体的类型
- design:paramtypes  函数参数装饰，能取到具体对象
- design:returntype  函数装饰，能取到具体类型
