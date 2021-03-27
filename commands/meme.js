const axios = require("axios");


module.exports = {
    name:"meme",
    description:"sends a random reddit meme",
    execute(message,args){
        
        let request = "https://meme-api.herokuapp.com/gimme";
        axios.get("https://meme-api.herokuapp.com/gimme")
        .then(function (response){
            console.log(response)
            let file = response["data"]["url"];
            console.log(file,typeof(file));
            message.channel.send("we ok ",{files:[file]});
        })
        
    }
}