
const fs = require("fs");
const email = require("./email");
module.exports = {
    name:"saveclowns",
    description:"saves the contents of the clown text channel",
    execute(message,args){
        message.reply("currently saving them");
        let writeMsg=[];
        let lastMsg = message.channel.lastMessageID;
        msgCollection(message,lastMsg,writeMsg);
    }

}


function msgCollection(message, lastMsg, writeMsg) {
    let overflowToggle = true;
  
    //  Works Reverse Chronologically:  It Grabs Recent Messages First and Works Backwards.
    message.guild.channels.get('810928650513416242').fetchMessages({ limit: 100, before: lastMsg })
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
    .catch(err=>{
        message.reply("something went wrong")
        email.execute(message,[])
    });  //  Catches Promise Errors
  }
  
  
  function writeToFile(message, writeMsg, overflowToggle) {
    console.log('Block Saved!');
    if (overflowToggle == true) {
        
        let d = new Date();
        let fileName = message.guild.channels.get('810928650513416242').name + '.txt';
        console.log(message.guild.channels.get('810928650513416242').name);
        fs.writeFileSync(fileName,'');
        for (i=writeMsg.length-1; i>=0; i--) {
            fs.appendFile(fileName, `${writeMsg[i]} \n`, (err) => {
                if (err) {
                    message.reply("something went wrong")
                    email.execute(message,[])
                    throw err;
                }
            })
        }
  
    }
  
  }