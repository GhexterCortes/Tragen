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
let client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES
    ]
});

client.login(config.token);

client.on('ready', function (){
    Logger.log('Bot is now ready!', 'Bot');
    Logger.log('Bot Invite Link: https://discord.com/api/oauth2/authorize?client_id='+client.user.id+'&permissions=8&scope=bot', 'Bot');

    client.user.setPresence({
        status: config['presence']['status'],  //You can show online, idle....
        activities: [{
            name: config['presence']['name'],  //The message shown
            type: config['presence']['type'].toUpperCase(), //PLAYING: WATCHING: LISTENING: STREAMING:
            url: config['presence']['url']
        }]
    });
});