// 2022.8.1 常见问题整理
// 1.浏览器中的单线程机制：为什么是单线程的？（因为不能一边操作DOM，一边修改DOM）
// 2.了解eventloop吗？--说一下eventloop的执行流程
// 初始化--> Timer检查阶段（是否有可执行的定时器setTimeout|setTimeInterval） --> I\O callbacks（是否有可执行的回调函数:
// 回调函数会在执行结果出来后进入任务队列！！）--> idle | prepare（libuv库内部的执行） --> idle（等待I\O回调函数执行完成） 
// --> check（setImmediate事件） --> close(socket.on('close'))
// setImmediate备注：非标准特性，不建议在生产环境中使用；可用于代替 setTimeout(fn, 0)执行
// setImmediate？？？和process.nextTick？？？

// 3.微任务和宏任务，是什么意思，执行时机有什么不同吗？
// 总结：微任务是指 promise.then的回调函数，process.nextTick不是微任务哦！process.nextTick在微任务之前执行！

// nextTick执行完成后（包括内部的process.nextTick），才会执行 promise
// Promise.resolve().then(() => console.log(1));
// new Promise((resolve, reject) => {
//     console.log(2);
//     resolve();
//     console.log(3);
// }).then(() => console.log(4));
// // process.nextTick会先执行同级别的；
// process.nextTick(() => console.log(5));
// process.nextTick(() => {
//     console.log(6);
//     // 这里的nextTick会等上一级的nextTick完全执行后，才开始执行
//     process.nextTick(() => console.log(7));
//     console.log(8);
// });
// process.nextTick(() => console.log(9));
// // settimeout会最后执行
// setTimeout(() => {
//     console.log(10);
//     Promise.resolve().then(function() {
//         console.log(11);
//     });
// }, 0);
// console.log(12);
// 2 | 3 | 12 | 5 | 6 | 8 | 9 | 7 | 1 | 4 | 10 | 11

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
//     console.log('读取文件 回调函数耗费的 time = ', Date.now() - timeoutScheduled);
//     const startCallback = Date.now();
//     setTimeout(() => {
//         console.log('读取文件 setTimeout 100ms 4444');
//     }, 100);
//     setTimeout(() => {
//         console.log('读取文件 setTimeout 0',);
//     }, 0);
//     // 此处，会先输出2， 再输出1，因为先进入了check阶段；
//     setTimeout(() => console.log(1));
//     setImmediate(() => console.log(2));
//     while (Date.now() - startCallback > 200) {
//         // 什么也不做
//         // console.log('读取文件 200ms后 6666');
//     }
// });

// 4.setTimeout和微任务promise的执行时机
// 总结：node V11版本以后，在每个宏任务的执行间隙，都会执行一次process.nextTick、微任务；
// 总结：在node V11版本以前，会统一先执行宏任务，然后再执行 process.nextTick、微任务;
// setTimeout(()=>{
//     console.log('timer1');
//     Promise.resolve().then(function() {
//         console.log('promise1');
//     });
//     process.nextTick(() => console.log('nextTick1'));
// }, 0);

// setTimeout(()=>{
//     console.log('timer2');
//     Promise.resolve().then(function() {
//         console.log('promise2');
//     });
//     process.nextTick(() => console.log('nextTick2'));
// }, 0);

// 测试 promise、setTimeout、setImmediate的顺序
setTimeout(() => {
    setTimeout(() => console.log(1), 0);
    setImmediate(() => console.log(2));
}, 0);
setTimeout(() => console.log(3), 0);
setImmediate(() => console.log(4));
// 3 | 4 | 2 | 1：在回调函数中 setTmmediate的执行时机早于 setTimeout；

process.nextTick(() => {
    console.log(5);
    process.nextTick(() => {
        console.log('5-1');
        process.nextTick(() => console.log('5-1-1'));
    });
    process.nextTick(() => console.log('5-2'));
});
Promise.resolve().then(() => console.log(6));
(() => console.log(7))();
new Promise((resolve, reject) => {
    console.log(8);
    resolve(1);
    console.log(9);
}).then((res, err) => {
    console.log(10);
});

// 问题5：总结 宏任务（setTimeout \ setInterval | setImmediate）、微任务、Process.nextTick
// process.nextTick是添加到同步执行栈的尾部，在所有异步任务开始前执行；setImmediate是添加到异步任务队列的尾部！！
// 微任务在 nextTick执行后，异步任务执行前
// 事件循环机制，在node V11以后，会在每次执行宏任务的间隙，执行一次process.nextTick | promise.then
// process.nextTick会递归执行完所有任务；而setImmediate每次只会执行当前层次的；
