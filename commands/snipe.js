

module.exports = {
    name:"snipe",
    description:"reveals a deleted message",
    execute(message,args){
        const bot = args.pop();

        let username = args.join()
        console.log(bot.snipes,`in snipe with ${username}`);
        let theUserSnipes = [];
        for(let snipe of bot.snipes){
            if(username === snipe.name){
                theUserSnipes.push(snipe.content)
            }
        }
        console.log(theUserSnipes);
        const randomElement = theUserSnipes[Math.floor(Math.random() * theUserSnipes.length)];
        message.channel.send(`Le 360 mlg no scope ${randomElement}`);
    }
}