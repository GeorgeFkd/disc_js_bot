const fs = require('fs');
require('dotenv').config();
const jokes = require('give-me-a-joke');
const Discord = require('discord.js');
const bot = new Discord.Client();
process.env.TOKEN = 'ODI0MjczNzQyOTQzMzU0OTAw.YFs-vg._fg_1ayLm7wCtK7l7RuelDeNEVM'
;
//c4
const serverID = '810928650513416242';
const clownId = '810928650513416242';

const TOKEN = process.env.TOKEN;
//change3


//const clownChannel = bot.channels.get('810928650513416242');
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
  if(msg.content ==='save'){
    msg.reply("currently saving them");
    let writeMsg=[];
    let lastMsg = msg.channel.lastMessageID;
    msgCollection(msg,lastMsg,writeMsg);
  }

  // const{ name,region,memberCount} = guild;
  // console.log(name,region,memberCount);
  // msg.channel.fetchMessages({around:clownId,limit:5})
  // .then(messages =>{
  //   const fetched = messages.first();
  //   console.log(fetched);
  //   msg.reply(fetched);
  // })
  if(msg.content === 'clown moment'){
    fs.readFile('🤡moments.txt','utf-8',(err,data)=>{
      if(err){
        console.error(err);
        return;
      }
      let dataArr = data.split(',').join().split('\n');
      msg.reply(dataArr[Math.floor(Math.random()*dataArr.length)])
    })
  }
  if(nonAppreciation.some((str)=>msg.content.includes(str))){
    const index =Math.floor(Math.random()*nonAppreciation.length);
    msg.reply(nonAppreciationResponse[index]);

  }
  if(msg.content.includes("bad joke")){
    msg.reply("I don't give a shit for your worthless opinion");
  }
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
function msgCollection(message, lastMsg, writeMsg) {
  let overflowToggle = true;

  //  Works Reverse Chronologically:  It Grabs Recent Messages First and Works Backwards.
  message.channel.fetchMessages({ limit: 100, before: lastMsg })
  .then(messages => {
      messages.array().forEach((message, index)=>{  //  Funnels the last 100 Messages into an Array
          writeMsg.push(`${message.content}`);  //  Writes the Message Author and Content to an Array

          //  Checks if a Text Channel has more than 100 Messages and Recursively Readies the Second Block of 100 Messages
          if (index == 99) {
              lastMsg = message.id;
              overflowToggle = false;  //  Toggle to Make Sure All Messages are Collected in The Array Prior to being Written to a File.
              msgCollection(message, lastMsg, writeMsg)
          }
      })
      writeToFile(message, writeMsg, overflowToggle);  //  Sends the Array to be Written to a File
  })
  .catch(console.error);  //  Catches Promise Errors
}


function writeToFile(message, writeMsg, overflowToggle) {
  console.log('Block Saved!');
  if (overflowToggle == true) {

      let d = new Date();
      let fileName = message.channel.name + '.txt';

      for (i=writeMsg.length-1; i>=0; i--) {
          fs.appendFile(fileName, `${writeMsg[i]} \n`, (err) => {
              if (err) throw err;
          })
      }

  }

}
