
const fs = require("fs");
const { Util } = require("../node_modules/discord.js");
module.exports = {
    name:"clown",
    cooldown:0,
    requiredChannels:[],
    requiredRole:'',
    description:"Sends a random message from Clown Moments server",
    async execute(message,args){
        fs.readFile('🤡moments.txt','utf-8',(err,data)=>{
            if(err){
                message.channel.send("Something went terribly wrong and you should wait");
                throw new Error('something happened with the input file')
                
            }
            let dataArr = data.split(',').join().split('\n');
            dataArr = dataArr.filter((msg)=>!msg.includes("<@"));
            let response = dataArr[Math.floor(Math.random()*dataArr.length)]
            message.channel.send(response);
        })
    }

}