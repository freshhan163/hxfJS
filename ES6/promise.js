// 模仿一个fetch的异步函数，返回promise
function mockFetch(param) {
    return new Promise((resovle) => {
        setTimeout(() => {
            console.log('运行fetch函数 param = ', param, 'time = ', Date.now());
            resovle(param);
        }, 2000);
    });
}
const list = [ mockFetch, mockFetch, mockFetch, mockFetch, mockFetch, mockFetch ];
// console.log('list = ', list);

// list是接受的promise数组，n是最大并发数
function mockPromiseAll(list, n) {
    if (!Array.isArray(list)) {
        throw new Error('list must be an promise array');
    }

    let cnt = 0; // 记录运行成功的次数
    let result = []; // 最终结果
    let len = list.length;
    let i = 0; // 遍历数组的下标
    return new Promise((resolve, reject) => {
        // 首次执行，控制最大并发数n
        for (; i < n; i++) {
            addFn(i);
        }

        // index记录当前运行函数的下标
        function addFn(index) {
            // 控制最终执行条件，执行函数
            const p = Promise.resolve(list[index](index));

            p.then(res => {
                // 下标index
                result[index] = res;
                ++cnt;
                console.log('上一个请求结束 index = ', index, 'cnt = ', cnt);
                if (cnt === len) {
                    console.log('********************');
                    resolve(result);
                }

                if (i >= n && i < len) {
                    // 执行完成后，再塞入一个新请求
                    console.log('开始一个新的请求 i = ', i);
                    addFn(i);
                    ++i;
                }
            },
            err => {
                reject(err);
            });
        }
    });
}

mockPromiseAll(list, 2).then(res => {
    console.log('测试结果 result = ', res);
}, err => {
    console.log('测试err = ', err);
});
