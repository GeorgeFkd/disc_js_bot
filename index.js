const fs = require('fs');
const schedule = require("node-schedule");
const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix,token:TOKEN} = require('./config.json');
bot.commands = new Discord.Collection();
const {nonAppreciation,needsBotAsArgs} = require("./constants");
const welcome = require('./welcome');

const commandFiles = fs.readdirSync('./commands')
.filter(file=>file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name,command);
}



bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  const filename = 'program.txt';
  console.log(bot);
  bot.commands.get("setupschedule").execute(filename,bot);
  welcome(bot);
});

bot.on('message', async message => {
  if(message.content==="reset")resetBot(message.channel);

  const isInsult = nonAppreciation.includes(message.content); 
  if ((!message.content.startsWith(prefix) || message.author.bot)&& !isInsult) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
  let command;
  if(isInsult){
     command = bot.commands.get("badjoke");
  }else{
    command = bot.commands.get(commandName);
  }
  if(needsBotAsArgs.includes(commandName)){
    args = bot;
  }
  try{
    command.execute(message,args)
  }catch(e){
    console.error(e);
    msg.reply('there was an error trying to execute that command!');
  }
  

})



