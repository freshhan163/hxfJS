#!/usr/bin/env node
const { program } = require('commander');
const { nodemonTest } = require('../index.js');

program
    .option('-f, --file <name>', 'filename', 'main.js')
    .option('-t, --test <name>', 'test');

// program.parse(process.argv);
// console.log('args =', program.args);

// 1.读取参数
const options = program.opts();
console.log('options =', options);
// 2.传递参数
// 3.启动
nodemonTest(options.file);

