## 运行测试
```bash
node app.js
```
打开http://localhost:4100/graphql，即可看到apollo server提供的background

然后就可以输入
{
  todoList{
    _id
    content
    completed
  }
}

进行查询了