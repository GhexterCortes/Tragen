const fs = require('fs');
const yml = require('yaml');
const prompt = require('prompt-sync')();
const version = require('./version');
const log = require('./log');

const Logger = new log();

let config = {
    token: null,
    support_channel: null,
    version: version
}
let configYml = yml.stringify(config);

module.exports = function () {
    this.location = null;
    this.parse = () => {
        if(this.location == null) throw "No config file path";
        if(!fs.existsSync(this.location)) {
            try {
                fs.writeFileSync(this.location, configYml.toString());
            } catch (error) {
                throw "Unable to regenerate configuration file";
            }
        }
        
        let configRaw = fs.readFileSync(this.location, 'utf-8');
        config = yml.parse(configRaw);

        if(version != config.version) {
            Logger.error("Config version conflicts. Would you like to regenarate new config file?");
            let confirmRegen = prompt("(y/n): ");
                confirmRegen = confirmRegen.toLowerCase();

            if(confirmRegen == 'y') {
                this.regenConfig();
            } else{
                Logger.error("Unsupported config!");
                process.exit(0);
            }
        }

        return config;
    }
    this.regenConfig = () => {
        if(this.location == null) throw "No config file path";

        if(fs.existsSync(this.location)) {
            if(fs.existsSync(this.location + '.old')) fs.unlinkSync(this.location + '.old');
            fs.renameSync(this.location, this.location + '.old');
        }
        fs.writeFileSync(this.location, configYml.toString());
        this.parse();
    }
};