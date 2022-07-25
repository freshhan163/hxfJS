/*
 * 实现一个函数 fn, fn 接受如下数据结构，fn 的返回值为数组
 * 数组项为含有 children 的元素的 id
 * 例如如下数据结构的返回为：['1', '11', '112', '12']
 */
const cityData = [{
    id: '1',
    name: '广东省',
    children: [{
            id: '11',
            name: '深圳市',
            children: [{
                    id: '111',
                    name: '南山区'
                },
                {
                    id: '112',
                    name: '福田区',
                    children: [{
                        id: '1121',
                        name: 'A街道'
                    }]
                }
            ]
        },
        {
            id: '12',
            name: '东莞市',
            children: [{
                    id: '121',
                    name: 'A区'
                },
                {
                    id: '122',
                    name: 'B区',
                }
            ]
        }
    ]
}];

const fn = (data) => {
    const len = data.length;
    if (len === 0) {
        return [];
    }
    let result = [];
    for (const val of data) {
        if (val.children?.length > 0) {
            result.push(val.id);
            // 遍历children 关键点！！！是result.concat
            result = result.concat(fn(val.children));
        }
    }
    return result;
}

console.log('执行结果 result = ', fn(cityData));

/**
 * @desc 实现扁平数据结构--数组和树之间的转换
 * 链接：https://blog.csdn.net/jieweiwujie/article/details/122622584?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-4-122622584-blog-118891911.pc_relevant_multi_platform_whitelistv2_exp180w&spm=1001.2101.3001.4242.3&utm_relevant_index=7
 */

const data = [
    {
        "id": "1",
        "label": "炼铁厂",
        "type": 1,
        "value": "炼铁厂",
        "children": [
            {
                "pid": "1",
                "id": "1-1",
                "label": "炼铁作业区",
                "type": 2,
                "value": "炼铁作业区",
                "children": [
                    {
                        "pid": "1-1",
                        "id": "1-1-1",
                        "label": "1#线吊点右",
                        "type": 3,
                        "value": "1#线吊点右"
                    },
                    {
                        "pid": "1-1",
                        "id": "1-1-2",
                        "label": "川C7890",
                        "type": 3,
                        "value": "川C7890"
                    }
                ]
            },
            {
                "pid": "1",
                "id": "1-2",
                "label": "炼铁作业区",
                "type": 2,
                "value": "炼铁作业区",
                "children": [
                    {
                        "pid": "1-2",
                        "id": "1-2-1",
                        "label": "1#线吊点右",
                        "type": 3,
                        "value": "1#线吊点右"
                    },
                    {
                        "pid": "1-2",
                        "id": "1-2-2",
                        "label": "川C7890",
                        "type": 3,
                        "value": "川C7890"
                    }
                ]
            },
        ],
    },
    {
        "id": "2",
        "label": "炼钢厂",
        "type": 1,
        "value": "炼钢厂",
        "children": [{
            "children": [],
            "pid": "2",
            "id": "2-1",
            "label": "炼钢作业区",
            "type": 2,
            "value": "炼钢作业区"
        }],
    }
];


// 将树结构，扁平化处理
let list = [];

function reconstruct(data) {
    data.forEach(a => {
        list.push({
            'pid': a.pid ? a.pid : '0',
            'id': a.id,
            'label': a.label,
            'type': a.type,
            'value': a.value
        })
        if (a.children) {
            var arr = a.children;
            reconstruct(arr);
        }
    });
}
reconstruct(data);
console.log('list = ', list);


function reconstruct2(data) {
    let list = [];
    data.forEach(a => {
        list.push({
            'pid': a.pid ? a.pid : '',
            'id': a.id,
            'label': a.label,
            'type': a.type,
            'value': a.value
        });
        if (a.children?.length > 0) {
            list = list.concat(reconstruct2(a.children));
        }
    });
    return list;
}

const arr = reconstruct2(data);
console.log('reconstruct2 = ', arr);

/**
 * @desc 将扁平数组，转换为树结构
 */

// 方法1：只能获取指定pid，如果这是个多节点的树呢？？？
const arr1 = [
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 1, name: '部门1', pid: 0},
    {id: 5, name: '部门5', pid: 4},
    {id: 4, name: '部门4', pid: 3},
];

function getChildren(arr, result, pid) {
    for (const item of arr) {
        if (item.pid === pid) {
            // 提前定义newItem
            const newItem = { ...item, children: [] };
            result.push(newItem);
            // 第二个参数！！
            // 第三个参数！！ 寻找以子节点为pid的节点
            getChildren(arr, newItem.children, item.id);
        }
    }
}

function arrToTree(arr, pid) {
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }
    let result = [];
    getChildren(arr, result, pid);
    return result;
}

// const tree = arrToTree(arr1, 0);
// console.log('tree = ', tree[0]);

// 方法2：用map遍历，不用递归，两次for遍历
function arrToTree2(arr) {
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }
    const result = [];
    let arrMap = new Map();

    // 将数组转换为map存储，同时添加children属性
    for (const item of arr) {
        arrMap.set(item.id, { ...item, children: [] });
    }

    for (const item of arr) {
        const treeItem = arrMap.get(item.id);

        // 第一个节点
        if (item.pid === 0) {
            result.push(treeItem);
        } else {
            // 如果该节点，没有父节点的话，直接存储children
            if (!arrMap.has(item.pid)) {
                arrMap.set(item.pid, { children: [] });
            }
            // ！！！父节点的children，将其push进去
            arrMap.get(item.pid).children.push(treeItem);
        }
    }
    return result;
}

const tree2 = arrToTree2(arr1);
console.log('tree2 = ', JSON.stringify(tree2));

// 方法3：对方法2的优化，一次for遍历即可
function arrToTree3(arr) {
    let len = arr.length;
    if (len <= 1) {
        return arr;
    }
    const result = [];
    let arrMap = new Map();

    for (const item of arr) {
        const pid = item.pid;
        const id = item.id;

        // 这里children，取的是map上的children
        arrMap.set(id, { ...item, children: arrMap.get(id)?.children || [] });

        const treeItem = arrMap.get(id);
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!arrMap.has(pid)) {
                arrMap.set(pid, { children: [] });
            }
            arrMap.get(pid).children.push(treeItem);
        }
        console.log('arrMap =', arrMap);
    }
    return result;
}

// const tree3 = arrToTree3(arr1);
// console.log('tree3 = ', JSON.stringify(tree3) === JSON.stringify(tree2));
