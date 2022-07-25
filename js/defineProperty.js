// 学习Object.defineProperty，MDN基础文档；vue2中响应式是如何使用的，装饰器中怎么使用的，有哪些缺点（vue3为什么弃用）
// 1.所有属性：configurable | emurable | writable） | value | get | set
// 2.描述符：数据描述符（value | writable） + 存取描述符（get | set）
// 3.默认值，前3个为false，后三个为undefined
// 4.注意事项：如果定义了get | set，又定义了 value | writable），则会抛出错误
// 5.emurable--可枚举属性，会影响 object.keys | for..in
// 5.configurable——可配置属性，定义对象是否可被删除，以及 是否可修改 除 value | writable）以外的其他属性

const obj = {
    name: 'hxf',
    age: 22,
    address: {
        province: 'henan',
        city: 'shangqiu'
    }
};

for (let key in obj) {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        get() {
            console.log('get key =', key);
            // 用于测试对 obj.address.province的修改
            return {
                province: 'henan',
                city: 'shangqiu'
            };
        },
        set(x) {
            console.log('set x = ', x);
        }
    });
}

obj.name = 'hxf111';
obj.age = 333;
console.log('get访问 obj.name =', obj.name);

// 问题1：深层嵌套对象，是否能监听到
// 总结：无法监听到，除非递归的去监听对象属性
obj.address.province = 'beijing'; // set函数不会被触发

// set函数会被触发
obj.address = {
    province: 'beijing',
    city: 'beijing'
};

// 问题2：新增的obj属性，能否监听到
// 总结：新增属性的话，get和set都不会被触发
// set函数不会被触发
obj.score = 22;
// get函数不会被触发
console.log('新增属性 get访问obj.score = ', obj.score);

// 问题3：删除对象属性时，是否能监听到
// 删除不会有任何响应
delete obj.age;
// 删除以后再赋值，也不会触发set了
obj.age = 33;

// 问题4：通过索引修改数组属性，会有什么问题
// 总结：Object.defineProperty API是可以检测到修改的 ，没问什么问题
const arr = [1, 2, 3, 4, [5, [6, 7]]];

for (let key in arr) {
    console.log('key =', key);
    Object.defineProperty(arr, key, {
        configurable: true,
        enumerable: true,
        get() {
            console.log('get函数');
            return [1, 2];
        },
        set(x) {
            console.log('set arr =', x);
        }
    });
}

// 第一层get和set都会触发对应函数
console.log('访问数组 arr[0] =', arr[0]);
arr[1] = 222;

// 第二层，也会触发对应的get | set
console.log('访问数组 arr[4][0] =', arr[4][0]);
arr[4][0] = 555;

// 第三层，也会触发对应的get | set
console.log('访问数组 arr[4][1][0] =', arr[4][1][0]);
arr[4][1][0] = 666;

// 问题5：是否可以监听到数组的添加
// 总结：不会，下面函数不会触发set函数
arr[5] = 7;

// 问题6：vue2为什么要重写数组的操作方法，Object.defineProperty有什么问题
// 总结：1.Object.defineProperty无法监听length长度的变化，没办法监听数组的新增 2.尤大大认为监听数组索引改变数组操作消耗的性能与用户体验不成正比
// 其实本质上就是性能的取舍。对于在原有数组上的修改读取没有问题，push和pop是操作尾部的，O(1)复杂度，问题不大。
// 但'shift', 'unshift', 'splice', 'sort', 'reverse'，这些大概率会触发数组索引的移动或变动，触发很多次的get和set。

// Object.defineProperty在vue2项目中的使用总结
// 1.新增 | 删除属性，页面不会更新，可使用vue2提供的 $set() | $delete函数
// 2.直接通过下标修改数组，在vue2中，数组不会更新，是为了避免性能消耗问题
// 3.如果对象是深层次递归的，那需要递归的去遍历
