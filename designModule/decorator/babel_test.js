'use strict';

var _desc, _value, _class;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
    var originFunc = descriptor.value;

    descriptor.value = function () {
        console.log('我是函数装饰器');
        return originFunc.apply.apply(originFunc, [this].concat(Array.prototype.slice.call(arguments)));
    };
    return descriptor;
}
function funcDecorator2(target, name, descriptor) {
    var originFunc = descriptor.value;

    descriptor.value = function () {
        console.log('我是函数装饰器222222');
        return originFunc.apply.apply(originFunc, [this].concat(Array.prototype.slice.call(arguments)));
    };
    return descriptor;
}

var newButton = function () {
    function newButton(name, age) {
        _classCallCheck(this, newButton);

        this.name = name;
        this.age = age;
    }

    _createClass(newButton, [{
        key: 'onClick',
        value: function onClick() {
            console.log('this.name = ', this.name);
            this.name = 'hanxiaofang';
        }
    }]);

    return newButton;
}();

var Button = (_class = function () {
    function Button() {
        _classCallCheck(this, Button);
    }

    _createClass(Button, [{
        key: 'onClick',
        value: function onClick() {
            console.log('我是原来的func');
        }
    }]);

    return Button;
}(), (_applyDecoratedDescriptor(_class.prototype, 'onClick', [funcDecorator, funcDecorator2], Object.getOwnPropertyDescriptor(_class.prototype, 'onClick'), _class.prototype)), _class);


var btn = new Button();
btn.onClick();
