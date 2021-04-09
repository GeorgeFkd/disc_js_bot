//TODO NA SYMMAZEPSW PANTOY OTI STATHERA YPHRXE
const fs = require('fs');
const schedule = require("node-schedule");
const {Client,Intents,Collection, DiscordAPIError} = require('discord.js');
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
const {calcoholicsGuildID,remindmeplsRoleID,clownMomentsID} = require("./constants")
global.XP = new Collection();
const saveThatClown = require('./utilities/saveclowns')
const cooldowns = new Map();//'command name ','new disc collection'


bot.snipes = new Collection();

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
    membersID.map((id)=>{
      XP.set(id,0);
    })
  }
});




bot.on('message', async message => {
  if(message.content==="reset")resetBot(message.channel);
  //TODO να το κανω με node-schedule Μια φορα την βδομαδα να μαζευει τα μυνηματα
  //TODO KAI NA ΦΥΓΕΙ ΑΥΤΟ ΕΔΩ ΚΑΤΩ 
  if(message.channel.id ===clownMomentsID){
    saveThatClown(message.content);
  }
  const isInsult = nonAppreciation.includes(message.content); 
  if ((!message.content.startsWith(prefix) || message.author.bot)&& !isInsult) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
  let command;

  

//TODO NA BRW TROPO NA EINAI PIO GENERAL KAI PIO MODULAR OI ELEGXOI




  if(isInsult){
     command = bot.commands.get("badjoke");
  }else{
    command = bot.commands.get(commandName);
  }

  {//εδω τα cooldowns
    if(!cooldowns.has(command.name)){
    cooldowns.set(command.name,new Collection())
    }

    const curr_time = Date.now();
    const time_stamps = cooldowns.get(command.name)
    const cooldown_amount = (command.cooldown) * 1000;

    if(time_stamps.has(message.author.id)){
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount
      if(curr_time<expiration_time){
        const time_left = (expiration_time-curr_time) / 1000;
        return message.reply(`Perimene ligo re ${time_left.toFixed(1)} more seconds before using ${command.name}`)
      }
    }
  

    time_stamps.set(message.author.id,curr_time)
    setTimeout(()=> time_stamps.delete(message.author.id),cooldown_amount)
  }

  { //only channel specific commands
    //TODO ΝΑ ΒΑΛΩ ΝΑ ΔΕΙΧΝΕΙ ΜΕ ΣΥΝΔΕΣΜΟ ΤΑ ΚΑΤΑΛΛΗΛΑ ΤΣΑΝΕΛ ΠΡΕΠΕΙ ΝΑ ΒΡΩ ΤΑ ΑΝΤΙΚΕΙΜΕΝΑ ΤΥΠΟΥ ΤΣΑΝΕΛ ΚΑΙ ΝΑ ΤΑ ΒΑΛΩ ΣΤΙΣ ΑΓΚΥΛΕΣ
    if(command.requiredChannels.length ===0){//means all channels are ok
      console.log('we gucci')
    }else if(!command.requiredChannels.includes(message.channel.name) ){

      return message.reply(`The ${commandName} is not ok in the ${message.channel.name}\nTry these channels: ${command.requiredChannels.join(' ')} `)
    }

    
  }

  {
    //console.log(message.author,'message.author') this gives a user not a guildmember
    const theMember = message.guild.members.cache.get(message.author.id);
    const theRoles = theMember.roles.cache.map((role)=>role.name);
    if(command.requiredRole === ''){
      console.log('ima let you in')
    }else if(!theRoles.includes(command.requiredRole)){//if requiredRole = '' it is good and if theRoles is ['']
      return message.reply(`You need the ${command.requiredRole} role to access the ${command.name} command`)
    }
    
  }


  if(needsBotAsArgs.includes(commandName)){
    args.push(bot)
  }
  try{
    command.execute(message,args)
  }catch(e){
    console.error(e);
    msg.reply('there was an error trying to execute that command!');
  }
  

})


bot.on('messageDelete',async msg =>{
  const {content,author} = msg;
  console.log(content,author)
  if(!bot.snipes.has(author.id)){
    bot.snipes.set(author.id,[])
  }
  bot.snipes.get(author.id).push(content)
  const allsnipes = bot.snipes.get(author.id);

  bot.snipes.set(author.id,allsnipes)
  
})


module.exports ={XP}//TODO ΠΑΙΖΕΙ ΝΑ ΕΙΝΑΙ ΑΧΡΗΣΤΟ ΑΥΤΟ 




