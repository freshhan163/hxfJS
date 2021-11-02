const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  ctx.body = "hi my name is hanxiaofang111 222";
});
console.log('222333 555444 666 777');

app.listen(3000);
