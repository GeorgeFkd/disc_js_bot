const axios = require("axios");
const email = require("./email")

module.exports = {
    name:"meme",
    cooldown:0,
    description:"sends a random reddit meme",
    execute(message,args){
        
        let request = `https://meme-api.herokuapp.com/gimme/`;
        if(args.length>0){
            request += args[0];
        }
        axios.get(`https://meme-api.herokuapp.com/gimme/${args}`)
        .then(function (response){
            console.log(response)
            let file = response["data"]["url"];
            console.log(file,typeof(file));
            message.channel.send({files:[file]});
        })
        .catch(function (e){
            console.log(e);
            message.channel.send("Something went terribly wrong and you should wait");
            email.execute(message,[e]);
        });
        
    }
}