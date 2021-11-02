/**
 * 
 * @param dirpath 目录路径，可以是相对 | 绝对目录
 * @param ignoreFiles 忽略的文件名
 * @returns Promise
 * @description 循环读取目录下的文件，返回Promise
 */
 function recursiveReaddir(dirpath: string, ignoreFiles?: any[]): Promise<any> {
    if (!path.isAbsolute(dirpath)) {
        // @ts-ignore
        dirpath = path.join(__dirname, dirpath);
    }
    return new Promise(function(resolve, reject) {
        let list = [];
        fs.readdir(dirpath, function(err, files) {
            if (err) {
                return reject(err);
            }

            let len = files.length;
            if (!len) {
                return resolve(list);
            }

            files.forEach(file => {
                const filePath = path.join(dirpath, file);
                fs.stat(filePath, (_err, stats) => {
                    if (_err) {
                        return reject(err);
                    }

                    // 忽略某些文件--ignoreFiles
                    // TODO:待优化
                    if (ignoreFiles.includes(path.basename(filePath))) {
                        --len;
                        if (!len) {
                            return resolve(list);
                        }
                        return null;
                    }

                    // 判断是否是目录，是则递归调用；否则，list push进去
                    if (stats.isDirectory()) {
                        recursiveReaddir(filePath, ignoreFiles).then(res => {
                            list = list.concat(res);
                            --len;
                            if (!len) {
                                return resolve(list);
                            }
                        }, err => {
                            return reject(err);
                        });
                    } else {
                        --len;
                        list.push(filePath);
                        if (!len) {
                            return resolve(list);
                        }
                    }
                });
            });
        });
    });
};

// 测试 嵌套的目录
// recursiveReaddir('../../server').then(res => {
//     console.log('res = ', res);
// }, err => {
//     console.log('err =', err);
// });