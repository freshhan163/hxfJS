/**
 * @file obj_traverse_1019.js
 * @desc 对象数组、数组之间的转换关系
 */
const data = require('./obj--traverse');

// 算法1：遍历对象数组，返回 id信息
function Program1(data, pid) {
    let len = data.length;
    if (len === 0) {
        return data;
    }
    let result = [];
    for (let i = 0; i < len; i++) {
        const temp = data[i];
        result.push(temp.id);
        if (temp.children?.length > 0) {
            result = result.concat(Program1(temp.children));
        }
    }
    return result;
}

const res = Program1(data.data, 0);
console.log('res = ', res);

// 算法2：将复杂的对象数组，做扁平化处理
function program2(data, pid) {
    let len = data.length;
    if (len === 0) {
        return data;
    }
    let result = [];
    for (let i = 0; i < len; i++) {
        const temp = data[i];
        const obj = {
            id: temp.id,
            label: temp.label,
            type: temp.type,
            value: temp.value,
            pid: pid ?? 0
        };
        result.push(obj);
        if (temp.children?.length > 0) {
            result = result.concat(program2(temp.children, temp.id));
        }
    }
    return result;
}

const res2 = program2(data.data, 0);
console.log('对象数组扁平化处理 res2 = ', res2);

// 算法3：扁平的对象数组，按照Pid，拼接成新的对象数组
function program3(data, pid) {
    let len = data.length;
    if (len <= 1) {
        return data;
    }
    let result = [];
    // 为什么这么写？result只能Push
    getItemChildren(data, result, pid)
    return result;
}

function getItemChildren(arr, result, pid) {
    for (let item of arr) {
        if (item.pid === pid) {
            const obj = { ...item, children: [] };
            result.push(obj);
            // 修改 obj.children数组;
            getItemChildren(arr, obj.children, item.id);
        }
    }
}

const res3 = program3(res2, 0);
console.log('res3 = ', res3[0].children[0]);