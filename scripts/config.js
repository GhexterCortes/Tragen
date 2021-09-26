const fs = require('fs');
const yml = require('yaml');
const prompt = require('prompt-sync')();

module.exports = function () {
    this.location = './config/config.yml';
    this.parse = () => {

        if(!fs.existsSync(this.location)) throw "Config path is invalid!";

        let config = {
            token: null
        }

        return config;
    }
};