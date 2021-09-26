const fs = require('fs');
const utility = require('./util');

const Util = new utility();

function logMsg(text = '', prefix = null, level = 1){
    if(level < 1 || level > 3) throw "Invalid log level";

    switch (true){
        case (level === 1):
            text = prefix != null ? "[INFO - " + prefix + "] " + text : "[INFO] " + text;
            
            console.log(text);
            break;
        case (level === 2):
            text = prefix != null ? "[WARN - " + prefix + "] " + text : "[WARN] " + text;
            
            console.warn('\x1b[33m%s\x1b[0m', text);
            break;
        case (level === 3):
            text = prefix != null ? "[ERROR - " + prefix + "] " + text : "[ERROR] " + text;
            
            console.log('\x1b[31m%s\x1b[0m', text);
            break;
    }
}

module.exports = function () {
    this.log = (text, prefix) => {
        logMsg(text ,prefix, 1);
    }
    this.warn = (text, prefix) => {
        logMsg(text ,prefix, 2);
    }
    this.error = (text, prefix) => {
        logMsg(text ,prefix, 3);
    }
}