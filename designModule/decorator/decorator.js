// 针对类的装饰器
function classDecorator(target) {
    target.hasDecorator = true; // 针对类的装饰器，target就是类本身
    return target;
}
// 针对类的方法的装饰器
// target是类的 原型对象，因为类的方法，始终依附于类存在
// name是装饰的类的方法名
// descriptor：是属性描述对象，defineProperty里的 obj | prop | descriptor
// 逻辑：通过descriptor拿到函数体，把原函数推迟到新逻辑console的后面去执行
function funcDecorator(target, name, descriptor) {
    console.log('target = ', target, 'name = ', name, 'descriptor = ', descriptor);
    let originFunc = descriptor.value;

    descriptor.value = function () {
        console.log('我是函数装饰器');
        return originFunc.apply(this, ...arguments);
    };
    return descriptor;
}
function funcDecorator2(target, name, descriptor) {
    let originFunc = descriptor.value;

    descriptor.value = function () {
        console.log('我是函数装饰器222222');
        return originFunc.apply(this, ...arguments);
    };
    return descriptor;
}
class newButton {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    onClick() {
        console.log('this.name = ', this.name);
        this.name = 'hanxiaofang';
    }
}
class Button {
    // 装饰器函数的调用时机：Button实例是运行时生成的，但装饰器函数在编译阶段执行，因此装饰器函数只能拿到类层面上的对象
    @funcDecorator
    @funcDecorator2
    onClick () {
        console.log('我是原来的func');
    }
}

const btn = new Button();
btn.onClick();