// 方法1：用count变量，记住上面的时间差
class Queue {
    constructor() {
        this.taskList = [];
        this.count = 0; // 用来记录上一次的时间，需要等上一次的时间结束后，再运行下一个settiemout
    }

    task(time, fn) {
        this.count += time;
        this.taskList.push({time: this.count, fn});
        return this;
    }
    async start() {
        this.taskList.forEach(task => {
            setTimeout(() => {
                task.fn();
            }, task.time);
        });
    }
}

// 实现这个Queue，start()后等1秒输出1，再等2秒输出2，再等3秒输出3.
// new Queue()
// .task(1000, ()=>console.log('方法1 time =', new Date, 1))
// .task(2000, ()=>console.log('方法1 time =', new Date, 2))
// .task(3000, ()=>console.log('方法1 time =', new Date, 3))
// .start();

// 方法2：异步的promsie
class Queue2 {
    constructor() {
        this.taskList = [];
    }

    task(time, fn) {
        const promise = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn());
            }, time);
        });
        this.taskList.push(promise);
        return this;
    }
    async start() {
        // 不可以用forEach | map！！！，forEach会并发执行，并不会因为await阻塞下一个
        // this.taskList.forEach(async fn => {
        //     console.log('1111');
        //     await fn();
        // });
        for(const cb of this.taskList) {
            await cb();
        }
    }
}

new Queue2()
.task(1000, ()=>console.log('time =', new Date, 1))
.task(2000, ()=>console.log('time =', new Date, 2))
.task(3000, ()=>console.log('time =', new Date, 3))
.start();