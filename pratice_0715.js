// eventbus
// 问题1：once如何设计
// 问题2 ：如何传参

class EventEmitter {
    constructor() {
        this.emitObj = {};
    }

    on(type, fn) {
        if (!this.emitObj[type]) {
            this.emitObj[type] = [];
        }
        this.emitObj[type].push(fn);
    }

    off(type, fn) {
        if (!this.emitObj[type]) {
            return;
        }
        const index = this.emitObj[type].findIndex(item => item === fn);
        if (index > -1) {
            this.emitObj[type].splice(index, 1);
        }
    }

    // 一定要是 ...args，如果是args，则只能接收1个参数
    emit(type, ...args) {
        if (!this.emitObj[type]) {
            return;
        }
        this.emitObj[type].forEach(fn => {
            // 调用的时候，也是...args
            fn(...args);
        });
    }
    once(type, fn) {
        const wrapper = (...args)=> {
            fn(...args);
            this.off(type, wrapper);
        };
        this.on(type, wrapper);
    }
}

const eventbus = new EventEmitter();

function add3() {
    console.log('add3');
}

eventbus.on('add', (arg1, arg2) => {
    console.log('add1 arg =', arg1, arg2);
});
eventbus.on('add', () => {
    console.log('add2');
});
eventbus.on('add', add3);

eventbus.emit('add', 1, 2);

console.log('移除函数 add3');
// ！！！ 注意不能是箭头函数，否则无法移除，因为每次生成的箭头函数都不一致
eventbus.off('add', add3);
eventbus.emit('add', 1, 2);

console.log('测试once函数');
eventbus.once('once', (...args) => {
    console.log('once args =', args);
});
eventbus.on('once', () => {
    console.log('once函数 on注册');
});
eventbus.emit('once', 1, 2);

eventbus.emit('once');

// 1. for..in是ES5，for..of是ES6
// 2. for..of只能遍历有迭代iterator属性的数据结构
// 3. https://es6.ruanyifeng.com/#docs/iterator#for---of-%E5%BE%AA%E7%8E%AF
function testForIn() {
    const arr = [
        {
            name: 'hxf',
            key: 1
        },
        {
            name: 'hbb',
            key: 2
        },
    ];
    
    const obj = {
        hxf: {
            name: 'hxf',
            key: 1
        },
        hbb: {
            name: 'hbb',
            key: 2
        }
    };

    // 测试自身属性
    arr.name = '测试自身属性';
    
    console.log('for..in obj');
    for (const key in obj) {
        console.log('key = ', key);
    }
    
    console.log('for..in arr');
    for (const key in arr) {
        console.log('key = ', key, 'val = ', arr[key]);
    }
    
    console.log('for..of obj');
    // for (const key of obj) {
    //     console.log('key = ', key);
    // }
    
    console.log('for..of arr');
    for (const val of arr) {
        console.log('val = ', val);
    }
}

// testForIn();

// 算法题
// deppclone