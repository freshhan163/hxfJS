#!/usr/bin/env bash

# 输出以png结尾
allPackages=$(ls -l codestore-fe1/src/**/* | grep "png$")
oldPackages=$(ls codestore-fe2/src/**/* | grep "png$")
test="test111"

# test=1
# echo $(( test=test+4, test+ 4 ))
# echo $tt >> save.sh
# echo $test >> save.sh


# read命令测试
# echo -n "请输入你的名字："
# read -p "请输入你的名字：" -t 3 response name
# echo "欢迎你：$name"

if [ -e save.sh ]; then
    echo "文件存在"
fi

if [ -e save1.sh ]; then
    echo "存在"
else
    echo "文件不存在"
fi

# FILE=/etc/passwd

# read -p "Enter a username > " user_name
# file_info="$(grep "^$user_name:" $FILE)"



foo=codestore-fe2/src/images/rpa.png
# echo ${foo/#JPG./$test}

# echo ${oldPackages}
# for i in $oldPackages; do
    # echo ${i#*/} # 非贪婪匹配，只去除第一个匹配/的路径
    # echo ${i##*/} # 贪婪匹配，删除所有匹配/的路径
    # echo ${i/#codestore-fe2/$test} # 返回被替换后的数据

    # echo ${i%/*}
    # echo ${i%%/*}
    # echo ${i/%png/jpg11}
# done
# echo $allPackages
# l=$(find oldPackages -name "*.png")
# echo $l

# 函数如何调用
function getImgSize () {
    info=$(ls -l $1)
    arr=(${info//\s/ })
    return ${arr[4]};
}

# for file in $allPackages; do
#     # 如果是目录，则进行下一个循环
#     if [ -d $file ]; then
#         continue
#     fi
#     # 如果是png文件
#     if [[ "$file" =~ ^[\-_a-zA-Z0-9\/]*.png$ ]]; then
#         filePath=${file:13}
#         # echo $filePath
#         oldFile=codestore-fe2${filePath}
#         if [ -f $oldFile ]; then
#             $(getImgSize $file)
#             currentSize=$?
#             $(getImgSize $oldFile)
#             oldSize=$?
#             sizeGap=$(($oldSize - $currentSize))
#             if [ $sizeGap -ge 0 ]; then
#                 echo -ne "\033[32m 修改文件 \033[0m $file size变更了"
#                 echo -e "\033[32m $sizeGap \033[0m"
#             fi
#         # 如果有新增文件，则打印文件名 size
#         else
#             echo -ne "\033[31m +新增文件 \033[0m $file  文件大小为"
#             $(getImgSize $file)
#             echo -e "\033[31m $?kb \033[0m"
#         fi
#     fi
# done

#!/bin/bash
