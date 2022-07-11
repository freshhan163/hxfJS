## 创建客户端
### 安装
graphql
apollo-client
apollo-link-http

### 添加配置文件
graphql.config.json
graphql.schema.json
.graphqlconfig

### src项目
serviceWorker.js

graphql-server
├─ build
│    └─ build-env.js  将env.SENTRY_RELEASE环境变量，写入 dist/env.json（用于build.sh 和 dockerfile/Dockerfile中）
├─ config           请求代理proxy的相关配置
├─ dockerfile       Docker镜像相关（现在没有用到）
├─ graphql          提供graphql服务
│    ├─ mocks                   模拟数据
│    ├─ schedule                用于server/schedule/index.ts的数据同步
│    ├─ schema                  graphql的type、resolver等定义
│    ├─ applyMiddleware.ts      入口文件
│    ├─ consts.ts               常量定义
│    ├─ directives.ts           graphql的日期格式化指令
│    ├─ proxy.ts                创建proxy
│    └─ utils.ts                工具函数
├─ server           启动server
│    ├─ lib             提供abtest和logger日志服务
│    ├─ middleware      中间件相关（cookie处理、健康检查、第三方登录、log日志）
│    ├─ schedule        数据同步（每10s同步一次数据）
│    ├─ util            工具函数
│    ├─ dev.ts          入口文件（dev相关命令）
│    ├─ ktrace.ts       ktrace服务（只用于production环境）
│    └─ prod.ts         入口文件（yarn start:prod | yarn start:test 命令）
├─ types  全局声明TS（只有一个 FollowStatus）--可删除
│    └─ globalTypes.ts
├─ typings  补充的ts声明
│    ├─ koa.d.ts
│    ├─ node.d.ts
│    └─ process.d.ts
├─ .graphqlconfig
├─ build.sh
├─ graphql.config.json
├─ graphql.schema.json
├─ index.d.ts               TS声明（对.graphql、.gql模块的补充声明 -- 可删除）
├─ nodemon-debug.json       本地环境，debug模式下启动脚本（yarn dev:debug）
├─ nodemon.json             本地环境启动脚本（yarn dev）
├─ start.sh
├─ tsconfig.json            TS基础配置文件
|_ tsconfig.node.json       TS--Node环境配置文件


general-project/apps/pc-live/server
├── lib                         基础库
│   ├── abTestZkConnect.ts
│   ├── axios.ts
│   ├── config
│   ├── createGraphQLClient.ts
│   ├── devProxy.ts
│   ├── logger.ts
│   └── monitorCPUUsage.ts
├── middleware                  常用中间件
│   ├── access-logger.ts            访问日志记录
│   ├── api-switch.ts
│   ├── client-render.ts
│   ├── default-cookies.ts
│   ├── dev
│   ├── font-security
│   ├── health-check.ts
│   ├── log.ts
│   ├── mode-check.ts
│   ├── nginx-check.ts
│   ├── redirect.ts
│   ├── render.ts
│   ├── sentry.ts
│   ├── server-render.dev.ts
│   ├── server-render.ts
│   ├── spammer-honeypot.ts
│   └── third-part.ts
├── util                        工具函数
│   └── index.ts
├── dev.ts                      developemnt环境入口
├── ktrace.ts                   ktrace服务（收集数据发送到web查询界面，[ktrace文档](http://ktrace-web-sdk.devops.test.gifshow.com/#%E6%94%AF%E6%8C%81%E7%9A%84%E5%B9%B3%E5%8F%B0)）
├── server.ts                   production模式入口（功能同dev.ts，另外新增了 ktrace服务、开启了SENTRY配置，render渲染和错误捕获的处理也略有不同）
└── static-render-path.ts       静态资源渲染常量配置（用于server.ts 和 middleware/render.ts中间件）

● 创建schema：graphql/schema/index.js
	○ 引用apollo-server的 makeExecutableSchema 创建schema ==> schemaDefs ==> 遍历读取当前目录下的所有文件，如果是.ts | .js则push到数组；如果是目录则递归遍历；
● proxy配置grap


● pc-live项目启动逻辑
	○ dev:local --> nodemon.json --> server/dev.ts（难道不用启动vue项目吗？）
	

● 开始打包
	○ buildDev() ==> dev/build-dev.ts ==> configBuilder() 调用buildConfig/，获取config设置==> webpack(clientConfig)先打包client ==> webpack(serverConfig) 再打包server（mode=modern）==>build结束
	○ ctx.serverRender
	○ ctx.clientRender

● buildConfig/打包相关配置
	○ 入口：
		■ dev模式：build-dev.ts --> client | server --> webpack.client.conf | webpack.server.conf 
		■ build模式：build.ts -->  buildCompile --> 删除原文件夹 --> compile  --> webpackCompile （client | server）--> buildEnv（输出某些需要注入的变量）
	○ client打包：webpack.client.conf --> webpack.base.conf --> entry | output | loaders | 基础plugins（service-workers） --> plugins（SSRPlugin --> SPA Plugin --> PWA Plugin --> VueSSRPlugin --> 自定义SPA插件 --> SENTRY_API_KEY | ANALY字段的处理 ）--> 客户端自定义optimization优化
	○ server打包： webpack.server.conf  -->  webpack.base.conf --> 自定义属性（entry | mode | target | module | VueSSRServerPlugin）
	○ utils：自定义loader库
	○ config/index：定义development\production模式下，webpack中会用到的一些常量
● middleware/dev/build-dev.ts：用于打包