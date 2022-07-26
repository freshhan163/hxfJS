/**
 * get属性实例应用1：实现方法的链式调用
 */
function proxyLink() {
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
}

/**
 * @desc 使用Proxy + Reflect 实现观察者模式: 观察者：多个fn，观察目标：1个；
 * @observe 将观察者绑定到数组中；
 * @observable 绑定观察目标，一旦有set操作，则触发观察者的某个操作；
 */
function observeFunc() {
    let queuedObserver = new Set(); // 收集所有观察者，观察者是一个函数
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
    
    // 收集观察者
    observe(print);
    
    const obj = {
        name: 'yangfan',
        age: 22
    };
    // 确定观察目标
    const observeA = observable(obj);
    
    // 观察者模式
    observeA.name = 'hxf111';
}

// 2022.7.26 proxy相关问题复习
// 定义对象
let a = {
    name: 'hxf',
    age: 22,
    address: {
        city: 'beijing',
        zone: 'haidian'
    }
};
// 普通访问
console.log('a.name =', a.name);

// 1.为什么要引入proxy？ https://liuwenzhuang.github.io/2020/09/07/fantastic-proxy-in-javascript.html
// 1.JS中对象基本处于裸奔状态，可对对象实现任何操作，proxy可以拦截和过滤对对象的访问；
// 2.通过proxy可以实现对象属性的校验、模拟对象的私有属性

// 2.基础API
// 创建--new Proxy(obj, handleFn)
// handleFn--get | set | apply | has | constuct | deleteProperty | defineProperty
// | getOwnPropertyDescriptor | getPrototypeOf | ownKeys | preventExtensions | setPrototypeOf

// 为对象a添加proxy
const proxyA = new Proxy(a, {
    get: function(target, prop, receiver) {
        // console.log('target = ', target, );
        // console.log('receiver = ', receiver, );
        console.log('get prop =', prop);
        return target[prop];
    },
    set: function(target, prop, value, receiver) {
        console.log('set prop =', prop, 'value = ', value);
        target[prop] = value;
        return target;
    },
    deleteProperty: function(target, key) {
        console.log('删除属性');
        delete target[key];
        return true;
    }
});

console.log('proxyA.name =', proxyA.name); // 访问proxy

// 应用：将proxy绑定到object.proxy属性上，就能通过访问obj，访问对应的proxy
a.proxy = proxyA;
console.log('a.name =', a.proxy.name);

// 2.对象属性的深层次遍历，是否需要递归添加proxy？新增对象属性 | 删除对象属性时呢？
console.log('深层次属性 proxyA.address =', proxyA.address); // 触发get
console.log('深层次属性 proxyA.address.city =', proxyA.address.city); // 不能触发get！！！

proxyA.name = 'hxf111'; // 触发set
proxyA.address.city = 'beijing1111'; // 不能触发set！！！

proxyA.score = 100; // 新增属性，触发set
proxyA.address.building = 'zijin'; // 深层次对象，不能触发set

delete proxyA.name; // 触发deleteProperty
delete proxyA.address.city; // 深层次属性，不能触发

// 3.修改数组长度等defineProperty无法监听到的操作，proxy是否能监听到？
// 总结：修改数组长度，可通过set拦截到；通过下标修改数组，也可拦截到;
// 总结：proxy在拦截数组的push时，会触发两次set，一次是修改 length长度，一次是修改Key值；拦截Pop时会触发deleteProperty | set | 多次get
// proxy在拦截shift时，会引发多次 set | get | delete
console.log('**************数组相关操作********************');
const arr = [
    {
        name: 'hxf',
        age: 20,
        address: {
            city: 'beijing',
            zone: 'haidian'
        }
    },
    {
        name: 'yangfan',
        age: 30,
        address: {
            city: 'beijing',
            zone: 'changping'
        }
    },
];

const proxyArr = new Proxy(arr, {
    get: function(target, propKey, receiver) {
        console.log('拦截get propKey =', propKey);
        return target[propKey];
    },
    set: function(target, propKey, value, receiver) {
        console.log('拦截set propKey =', propKey, 'value = ', value);
        target[propKey] = value;
        return target;
    },
    deleteProperty: function (target, propKey) {
        console.log('删除属性 propKey =', propKey);
        delete target[propKey];
        return true;
    }
});
proxyArr[0]; // 触发get
proxyArr[0].name; // 只能拦截到对0的访问，无法拦截到name

proxyArr[1] = '111'; // 拦截到set
proxyArr.length = 5; // 拦截到set，propKey = length
console.log('proxyArr =', proxyArr); // 确实新增了一个属性

proxyArr[3] = '333';
proxyArr[7] = '101010';
console.log('proxyArr =', proxyArr); // 新增了一个属性

// proxyArr.push(11); // push时触发了两次get、两次set，一次修改key，一次修改length
// proxyArr.pop(); // pop触发了3次get， pop\ length \ 获取当前属性，一次删除、一次set--修改length
proxyArr.unshift(0); // 会触发多次get | set和deleteProperty

console.log('\n**************this指针********************\n');
// 4. proxy的this问题
// 总结：目标对象中的this，会指向proxy代理；proxy的handler中的this，会指向 handler本身
// 导致的问题：即使Proxy什么都不修改，也会导致通过proxy访问到的属性，和原对象的操作不一致

let proxyObjHxf;
class Person {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log('对象中的this = proxyObjHxf ', proxyObjHxf ? this === proxyObjHxf : this);
        console.log('对象中的this = ', this);
        console.log('this.name = ', this.name);
    }
}

const hxf = new Person('hanxiaofang');
hxf.sayName();

proxyObjHxf = new Proxy(hxf, {});
proxyObjHxf.sayName(); // this指向proxyObjHxf, 而不是target

// 测试handler中的this
const handler = {
    get(target, prop) {
        console.log('this = handler', this === handler);

        // 解决proxy中的this指向问题
        // return Reflect.get(target, prop);
    }
}

const proxyObjThis = new Proxy(hxf, handler);
proxyObjThis.name;

// 4.proxy为什么要搭配reflect使用
// 两个方面：对象层面--完善对象的操作（3个方面），proxy方面--解决proxy中指向的问题（由于用proxy代理的对象，改变了其内部的this指向，因此需要使用Reflect）

// 5.proxy和reflect常见面试题
// 5.1 谈谈你对proxy的理解
// 总结：3个方面--1)proxy定义、要解决什么问题 2）常用的API 3）应用场景（实现观察者模式、拦截对对象的访问、声明对象的私有属性）
// 5.2 proxy和reflect
// proxy里面为什么要用reflect?（https://www.zhihu.com/question/460133198）
// 解决proxy中this指向错误的问题 | 传递正确的???

// 6.谈谈Reflect
// reflect: https://fe.ecool.fun/topic-answer/18682a73-0c4e-4859-96fd-2a6fde7587b7
