const { exec, spawn } = require('child_process');


console.log('test.js');
setTimeout(() => {
    console.log("set timeout111");
    // console.log("set timeout111");
}, 2000);

// 测试exec 和 spawn
// exec('node test.js', (err, stdout) => {
//     console.log('stdout =', stdout);
// });

// spawn('node', ['test.js'], {
//     stdio: [process.stdin, process.stdout, process.stderr]
// });

// test1.stdout.on('data', (data) => {
// console.log(`stdout: ${data}`);
// });

// test1.stderr.on('data', (data) => {
// console.error(`stderr: ${data}`);
// });