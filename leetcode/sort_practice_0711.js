// 冒泡排序
function bubbleSort(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    for (let i = 0; i < len - 1; i++) {
        let swapFlag = false;
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                swapFlag = true;
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        if (!swapFlag) {
            return arr;
        }
    }
    return arr;
}
// const a = [3, 7, 8, -3, 2, 0, 9, -10];
// console.log('冒泡排序：', bubbleSort(a));
// console.log('冒泡排序：', bubbleSort([1]));
// console.log('冒泡排序：', bubbleSort([2, 1]));
// console.log('冒泡排序：', bubbleSort([2, 1, -3]));



function insertSort(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    for (let i = 1; i < len; i++) {
        const key = arr[i];
        let j = i - 1;
        for (; j >= 0 && arr[j] > key; --j) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
    return arr;
}
const a = [3, 7, 8, -3, 2, 0, 9, -10];
console.log('insertSort', insertSort([1, 3, 2]));
console.log('insertSort: ', insertSort(a));

function mergeSort(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    const mid = Math.floor(len / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const leftLen = left.length;
    const rightLen = right.length;
    if (leftLen === 0 || rightLen === 0) {
        return left.concat(right);
    }
    let result = [];
    let l = 0;
    let r = 0;
    while (l < leftLen && r < rightLen) {
        if (left[l] <= right[r]) {
            result.push(left[l]);
            ++l;
        } else {
            result.push(right[r]);
            ++r;
        }
    }
    if (l < leftLen) {
        result = result.concat(left.slice(l));
    }
    if (r < rightLen) {
        result = result.concat(right.slice(r));
    }
    return result;
}
console.log('mergeSort([3, 1, 4])', mergeSort([3, 1, 4]));
console.log('mergeSort([3, 1, 2])', mergeSort([3, 1, 2]));
console.log('mergeSort([0, 1, 5, 7, 2, 4]', mergeSort([0, 1, 5, 7, 2, 4]));

function quickSort(arr, left, right) {
    const len = arr.length;
    // 备注！！！这里要加
    if (len <= 1) {
        return arr;
    }
    // 这里必须加！！！
    if (left >= right) {
        return arr;
    }
    const index = partSort(arr, left, right);
    // 下标！！！
    quickSort(arr, left, index - 1);
    quickSort(arr, index + 1, right);
    console.log('arr =', arr);
}

// 左右指针
function partSort(arr, left, right) {
    // 基准值
    const key = arr[right];
    // 记录right下标，不然后面right会变的！！！
    const max = right;

    // 是 <，而不是 <= !!!
    while (left < right) {
        while(arr[left] <= key && left < right) {
            ++left;
        }
        while (arr[right] >= key && left < right) {
            --right;
        }
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
    }
    // 最后交换left和right
    const temp = arr[left];
    arr[left] = arr[max];
    arr[max] = temp;
    
    return left;
}
// quickSort([3, 6, 2, 8], 0, 3);
// quickSort([3, 1, 3, 1, 0, 2, 2, 3, 4, 5], 0, 9);
// console.log(quickSort([4, 1, 7, 6, 9, 2, 8, 0, 3], 0, 8));
quickSort([0, 9, 2, 7, 5], 0, 4);

// quickSort2和 quickSort1是一样的；只是一次排序算法不同
function quickSort2(arr, left, right) {
    const len = arr.length;
    // 备注！！！这里要加
    if (len <= 1) {
        return arr;
    }
    // 这里必须加！！！
    if (left >= right) {
        return arr;
    }
    const index = partSort2(arr, left, right);
    // 下标！！！
    quickSort2(arr, left, index - 1);
    quickSort2(arr, index + 1, right);
    console.log('arr =', arr);
}

// 前后指针法
function partSort2(arr, left, right) {
    const key = arr[right];
    
    let pre = left - 1; // 指向比key大的值
    let cur = left; // 指向比key小的值
    while (cur < right) {
        while (arr[cur] <= key && ++pre !== cur) {
            // 交换 pre + 1 和 cur
            const temp = arr[pre];
            arr[pre] = arr[cur];
            arr[cur] = temp;
        }
        ++cur;
    }
    ++pre;
    arr[right] = arr[pre];
    arr[pre] = key;
    return pre;
}
// quickSort2([3, 6, 2, 8], 0, 3);
// quickSort2([3, 1, 3, 1, 0, 2, 2, 3, 4, 5], 0, 9);



// 希尔排序
function shellSort(arr) {
    const len = arr.length;
    if (len <= 1) {
        return arr;
    }
    let gap = 1;
    while (gap < len / 2) {
        gap = gap * 2 + 1;
    }
    for (; gap >= 1; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {
            const key = arr[i];
            let j = i - gap;
            while (j >= 0 && arr[j] > key) {
                arr[j + gap] = arr[j];
                j = j - gap;
            }
            arr[j + gap] = key;
        }
    }
    return arr;
}
console.log('shellSort =', shellSort([3, 2, 8, 6]))
console.log('shellSort', shellSort([3, 1, 3, 1, 0, 2, 2, 3, 4, 5]));