//Tragen Bot

const Discord = require('discord.js');
const prompt = require('prompt-sync')();
const commander = require('commander');
const fs = require('fs');
const parseConfig = require('./scripts/config');
const log = require('./scripts/log');
const utility = require('./scripts/util');

const Logger = new log();
const Util = new utility();
const Config = new parseConfig();

Config.location = './config/config.yml';
let config = Config.parse();

Logger.log(config.version);