
const fs = require("fs");
const { Util } = require("../node_modules/discord.js");
module.exports = {
    name:"clown",
    description:"Sends a random message from Clown Moments server",
    execute(message,args){
        fs.readFile('🤡moments.txt','utf-8',(err,data)=>{
            if(err){
                console.error(err);
                return;
            }
            let dataArr = data.split(',').join().split('\n');
            dataArr = dataArr.filter((msg)=>!msg.includes("<@"));
            let response = dataArr[Math.floor(Math.random()*dataArr.length)]
            message.channel.send(response);
        })
    }

}