## nodemon基本原理实现
### 问题1：监控文件改变
fs.watch
fs.watchFile
chokidar库
### 问题2：重新启动子程序
exec和spawn
exec：等所有结果都运行完成后，一起输出；
spawn：运行结果是一个流数据，有结果就输出；
### 问题3：重新启动程序防抖
debounce()
### 问题4：脚本bin链接
本地命令行采用commander库；
本地调试直接用node 运行js文件即可；
```bash
npm link // 将当前项目，连接到本地；链接后，即可使用package.json中定义的bin命令
npm unlink // 取消链接
```