const chokidar = require('chokidar');
const { spawn } = require('child_process');

let childProcess = null;
function restart() {
    console.log('restart');
    childProcess && childProcess.kill();
    childProcess = spawn('node', ['main.js'], {
        stdio: [process.stdin, process.stdout, process.stderr]
    });
}

let debounceRestart = debounce(restart, 500);

// 每500ms，就会执行一次add事件
function nodemonTest(filename) {
    console.log('filename =', filename);
    chokidar.watch(filename, {
        ignored: /node_modules/,
        depth: 2
    }).on('all', (event, path) => {
        console.log('restart event = ', event, 'path = ', path);
        debounceRestart();
    });
}


function debounce(fn, delay) {
    let id;
    return () => {
        clearTimeout(id);
        id = setTimeout(() => {
            fn();
        }, delay);
    };
}

module.exports = {
    nodemonTest
};
