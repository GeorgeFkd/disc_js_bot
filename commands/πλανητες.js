const fs = require('fs');
const email = require('./email')
const quotes = [];

module.exports = {
    name:"πλανητες",
    cooldown:60,
    description:"Σε ενημερώνει για την ζωή σου δια μέσου των πλανητών,μόνο έγκυρες προβλέψεις",
    execute(message,args){
       
        fs.readFile('predictions.txt','utf-8',(err,data)=>{
            if(err){
                console.log(err);
                message.channel.send("Something went terribly wrong and you should wait");
                
                return;
            }
            let dataArr = data.split('|')
            let response = dataArr[Math.floor(Math.random()*dataArr.length)]
            console.log(response)
            response = response.replace(/\d{1,}./,'')
            message.channel.send(response);
        })

    }
}