//TODO NA SYMMAZEPSW PANTOY OTI STATHERA YPHRXE
const fs = require('fs');
const schedule = require("node-schedule");
const {Client,Intents,Collection} = require('discord.js');
const intents = new Intents(268438528);
const bot = new Client({ws:intents});
const {prefix,token:TOKEN} = require('./config.json');
bot.commands = new Collection();
const {nonAppreciation,needsBotAsArgs} = require("./constants");
const welcome = require('./welcome');
const courses_reminders = require("./courses_reminders");
const commandFiles = fs.readdirSync('./commands')
.filter(file=>file.endsWith('.js'));
const {setWaterReminders} = require("./water_reminder");
const {calcoholicsGuildID,remindmeplsRoleID} = require("./constants")
global.XP = new Collection();
new Collection();


bot.snipes = [];

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name,command);
}



bot.login(TOKEN);

bot.on('ready', async () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  
  const filename = 'program.txt';
  //both work properly
  courses_reminders(filename,bot);
  setWaterReminders(bot);
  welcome(bot);
  //initialize the xp
  {
    const members = bot.users.cache;
    const membersID = Array.from(members.keys())
    console.log(membersID);
    membersID.map((id)=>{
      XP.set(id,0);
    })

    console.log(XP);
  }
});

function initializeXP(){

}


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
    console.log(args,'the args')
    args.push(bot)
    console.log(args);
  }
  try{
    command.execute(message,args)
  }catch(e){
    console.error(e);
    msg.reply('there was an error trying to execute that command!');
  }
  

})

bot.on("messageDelete",async msg =>{
  const { id , content,author} = msg;
  console.log(id,content,author);
  let snipeObj = {};
  snipeObj.name = author.username;
  snipeObj.content = content;

  bot.snipes.push(snipeObj);
})


module.exports ={XP}




