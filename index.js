//Tragen Bot

const Discord = require('discord.js');
const prompt = require('prompt-sync')();
const commander = require('commander');
const fs = require('fs');
const parseConfig = require('./scripts/config');

const config = new parseConfig();

console.log(config.parse());