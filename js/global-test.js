// 'use strict';

// 非严格模式下，输出{}，相当于定义了一个window.greeting = {}
// 严格模式下，会报错：ReferenceError: greeting is not defined
greeting = {};
console.log('greeting =', greeting); 

function Person(name) {
    this.name = name;
    // 会忽略该返回值，仍然返回 { name: 'hxf' }
    // return '111';
    return { name: '1111' };
}

const p1 = new Person('hxf');
console.log('p1 = ', p1);

// p1.sayName(); // TypeError: p1.sayName is not a function

// 报错类型区分
// 1.ReferenceError
// 2.SyntaxError
// 3. TypeError: 值的类型非预期类型时发生的错误；传入函数的操作数或参数，非预期类型时，会报错
console.log('p1.age = ', p1.age); // undefined
// p1.sayName(); // TypeError: p1.sayName is not a function
// 4. RangeError
// 5. InternalError
// 6. URIError
// 7. EvalError

function getAge(...args) {
    console.log(typeof args, 'args = ', args); // object [21]
}
getAge(21);

(function() {
    const a = {};
    const b = { key: 'b' };
    const c = { key: 'c' };

    a[b] = 123;
    a[c] = 456;

    console.log('a[b] = ', a[b]);
})();

// TODO: Object.keys返回对象的可枚举属性，
(function(){
    let a = ['a', 'b', 'c'];
    a.name = 'name属性';
    for (let key in a) {
        console.log('key = ', key, 'item = ', a[key]);
    }
    console.log(Object.keys(a));
})();

// 箭头函数的返回值
const returnNumber = () => 10;
console.log('returnNumber() = ', returnNumber());

const user = { name: 'hxf', age: 20 };
// const getUser = user => { name: user.name, age: user.age }; // 会报错；要返回一个对象，必须外层要加 圆括号()
// console.log('getUser', getUser(user));

(function() {
    function  compareMembers(person1, person2 = person) {
        if (person1 !== person2) {
            console.log('Not the same');
        } else {
            console.log('They are the same');
        }
    }
    
    const person = { name: 'hxf' };
    console.log('compareMembers =', compareMembers(person));
})();

(function() {
    let name = 'hxf';
    function test() {
        let name = 'hx';
        console.log('name = ', name);
    }
    test();
})();


// 网络基础题
// css基础题
