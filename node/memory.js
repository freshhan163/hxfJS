const os = require('os');

function getNodeMemory() {
    const memory = process.memoryUsage();
    const totalMb = (memory.heapTotal / 1024 / 1024).toFixed(2);
    const usedMb = (memory.heapUsed / 1024 / 1024).toFixed(2);
    console.log(`node总内存空间：${totalMb}MB; 已占用空间${usedMb}MB`);
}

// rss：当前内存占用
// heapTotal：堆内存总占用
// heapUsed：已经使用的堆内存
// external：

function getOsMemory() {
    const freeM = os.freemem();
    const totalM = os.totalmem();
    console.log(`系统总空间：${totalM / 1024 / 1024}MB; 当前可用空间：${(freeM / 1024 / 1024).toFixed(2)}MB;`);
}
getOsMemory();

// 塞一个大数组，可能会导致内存溢出，会发现heapTotal一直在增加
// 修改默认内存空间：max-old-space-size=2048MB（默认最大2GB）,老生代默认是MB
// max-new-space-size=（新生代默认是KB）
// 修改内存空间命令：node max-old-space-size=2048
// 一般max-old-space-size，只能接受空闲内存的 75%；可用os.freemem来查看一下

let result =[];

// 创建一个大数组
const createNewArr = () => {
    let size = 1024 * 1024 * 20; // 大数组的尺寸
    let newArr = new Array(size); // 创建一个大数组
    return newArr;
};

for (let i = 0; i < 30; i++) {
    result.push(createNewArr());
    console.log('i =', i + 1);
    getNodeMemory();
}
console.log('success');



