
// nextTick执行完成后（包括内部的process.nextTick），才会执行 promise
Promise.resolve().then(() => console.log(1));
new Promise((resolve, reject) => {
    console.log(2);
    resolve();
    console.log(3);
}).then(() => console.log(4));
// process.nextTick会先执行同级别的
process.nextTick(() => console.log(5));
process.nextTick(() => {
    console.log(6);
    process.nextTick(() => console.log(7));
    console.log(8);
});
process.nextTick(() => console.log(9));
// settimeout会最后执行
setTimeout(() => {
    console.log(10);
    Promise.resolve().then(function() {
        console.log(11);
    });
}, 0);
console.log(12);

// 事件循环示例
// const fs = require('fs');
// const timeoutScheduled = Date.now();
// console.log('~~~~ 1111 时间 time = ', Date.now());
// // 异步任务一：100ms 后执行的定时器
// setTimeout(() => {
//     const delay = Date.now() - timeoutScheduled;
//     console.log(`2222 setTimeout ${delay}ms`);
// }, 100);

// // 异步任务二：文件读取后，有一个 200ms 的回调函数
// // 读取小文件一般不会超过100ms
// fs.readFile('./eventLoop.html', () => {
//     console.log('读取文件 time = ', 3333, Date.now());
//     const startCallback = Date.now();
//     setTimeout(() => {
//         console.log('读取文件 setTimeout 100ms 4444');
//     }, 100);
//     setTimeout(() => {
//         console.log('读取文件 setTimeout 0 5555');
//     }, 0);
//     while (Date.now() - startCallback > 200) {
//         // 什么也不做
//         console.log('读取文件 200ms后 6666');
//     }
// });

// setTimeout执行的机制：setTimeout执行完成一次后，会执行一次微任务和process.nextTick
// setTimeout(()=>{
//     console.log('timer1');
//     Promise.resolve().then(function() {
//         console.log('promise1');
//     });
// }, 0);

// setTimeout(()=>{
//     console.log('timer2');
//     Promise.resolve().then(function() {
//         console.log('promise2');
//     });
// }, 0);

// 测试 promise、setTimeout、setImmediate的顺序
// setTimeout(() => console.log(1));
// setImmediate(() => console.log(2));
// process.nextTick(() => console.log(3));
// Promise.resolve().then(() => console.log(4));
// (() => console.log(5))();
// new Promise((resolve, reject) => {
//     console.log(6);
//     resolve(1);
// }).then((res, err) => {
//     console.log(7);
// });
