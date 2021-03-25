require('dotenv').config();
const jokes = require('give-me-a-joke');
const Discord = require('discord.js');
const bot = new Discord.Client();
process.env.TOKEN = 'ODI0MjczNzQyOTQzMzU0OTAw.YFs-vg._fg_1ayLm7wCtK7l7RuelDeNEVM'
;
//c4
const serverID = '767468807328628776';
console.log(bot.channels);

const TOKEN = process.env.TOKEN;
//change3

const clownChannel = bot.channels.get(serverID);
//Discord.Message.guild.channels.find(channel=>channel.name==="🤡moments");
const nonAppreciation = ['bad joke','disapointment',
                        'didnt laugh','not funny'];
const nonAppreciationResponse = ["im calling the fbi to see who asked",
                                "The cia is investigating who asked for your opinion",
                              'how you think i care for your opinion?',
                              "I don't give a shit for your worthless opinion" ]

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  // if(msg.content.includes("bad joke")){
  //   msg.reply("I don't give a shit for your worthless opinion");
  // }
  if(nonAppreciation.some((str)=>msg.content.includes(str))){
    const index =Math.floor(Math.random()*nonAppreciation.length);
    msg.reply(nonAppreciationResponse[index]);
<<<<<<< HEAD
=======
  }
  if(msg.content.includes("bad joke")){
    msg.reply("I don't give a shit for your worthless opinion");
>>>>>>> 07399be4529e154a56b2b3bdc38082e556d378e2
  }
  //change2
  if(msg.content ==='gimme a clown'){
    const clownMoments = await clownChannel.fetchMessage({limit:100});
    msg.reply(clownMoments);
    msg.reply(clownMoments[Math.floor(Math.random()*clownMoments.length)]);
  }
  //chang1  
  //if(msg.content.includes("bad joke")){
  //   msg.reply("I don't give a shit for your worthless opinion");
  // }
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }else if(msg.content==='gimme dad joke'){
    
    msg.reply("im trying to stop crying bitch here is your damn joke");
    try{jokes.getRandomDadJoke(function(joke){
      msg.reply(joke);
    })
    }catch(e){
      msg.reply(`sth went wrong ${e}`);
    }
    
    
    
  }else if(msg.content === 'gimme joke'){
    msg.reply('here it is');
    try{jokes.getRandomCNJoke(function(joke){
      msg.reply(joke);
    })
    }catch(e){
      msg.reply(`sth went wrong ${e}`);
    }
  }
})
