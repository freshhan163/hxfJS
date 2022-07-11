let a = {
    name: 'hxf',
    age: 22,
    address: {
        city: 'beijing',
        zone: 'beijing'
    }
};
console.log('a.name =', a.name);

const proxyA = new Proxy(a, {
    get: function(target, name, receiver) {
        // console.log('target = ', target, );
        // console.log('receiver = ', receiver, );
        return '111';
    }
});

console.log('proxyA.name =', proxyA.name);

a.proxy = proxyA;

console.log('a.name =', a.proxy.name);

// get属性实例应用1：实现方法的链式调用

function doubleNumber(n) {
    return n * 2;
}
global.doubleNumber = doubleNumber;
global.powNumber = n => n * n;
global.reverseInt = n => n.toString().split('').reverse().join('') || 0;

const pipe = function(value) {
    let fnArray = [];
    const oproxy = new Proxy({}, {
        get: function(target, key) {
            if (key === 'get') {
                // 链式执行函数
                return fnArray.reduce((val, fn) => {
                    return fn(val);
                }, value);
            }
            // node的全局对象，是globalThis，没有window
            fnArray.push(globalThis.global[key]);
            return oproxy;
        }
    });
    return oproxy;
};

console.log('函数的链式调用 pipe(3) = ', pipe(3).doubleNumber.powNumber.reverseInt.get);

// 使用Proxy + Reflect 实现观察者模式
// 观察者：多个，观察目标：1个；
// observable：绑定观察目标，一旦有set操作，则触发观察者的某个操作；
// observe：将观察者绑定到数组中；

let queuedObserver = new Set(); // 收集所有观察者
function observe(fn) {
    queuedObserver.add(fn);
}

function print(obj) {
    console.log('打印obj obj =');
    for (const key in obj) {
        console.log(key, ' = ', obj[key]);
    }
}

// 被观察目标--obj
function observable(obj) {
    return new Proxy(obj, {
        set: function (target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            queuedObserver.forEach(fn => fn(target));
            return result;
        }
    })
}

observe(print);

const observeA = observable(a);

// 观察者模式
observeA.name = 'hxf111';