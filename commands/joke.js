
    //   msg.reply('here it is');
    //   try{jokes.getRandomCNJoke(function(joke){
    //     msg.reply(joke);
    //   })
    //   }catch(e){
    //     msg.reply(`sth went wrong ${e}`);
    //   }
const jokes = require("./give-me-a-joke");

module.exports ={
    name:"joke",
    cooldown:0,
    description:"gives a random cn joke(for now)",
    execute(message,args){
        try{jokes.getRandomCNJoke(function(joke){
                message.reply(joke);
              })
        }catch(e){
            message.reply(`sth went wrong ${e}`);
        } 
    }
}
