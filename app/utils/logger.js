import bunyan from 'bunyan'
import FileStream from './file_stream'
import utils from './utils'
import path from 'path'
import fs from 'fs'
import child_process from 'child_process'
import config from '../../config'

let log_option = {
    name: config.name,
    level: "debug", // 默认是 info
    src: true, // 日志中是否显示源码位置
    serializers: bunyan.stdSerializers
};

if (utils.isProduction()) {
    let logProcess = child_process.spawn('node', [path.join(utils.baseDir(), 'bin/log.js')]);
    log_option.stream = logProcess.stdin;
    let timer0 = setInterval(async() => {
        try {
            await FileStream.write_2_stream(logProcess.stdin, "##ok##");
        } catch (e) {
            clearInterval(timer0);
        }
    }, 7000);

    logProcess.stdout.on('data', function(data) {
        console.log(data + "");
    });

    logProcess.stderr.on('data', function(data) {
        console.error(data + "");
    });
}

//Bunyan is a simple and fast JSON logging library for node.js services
let logger = bunyan.createLogger(log_option);

logger.tag = function(option) {
    if (typeof option === 'string') {
        option = { tag: option };
    }
    return logger.child(option);
};

module.exports = logger;