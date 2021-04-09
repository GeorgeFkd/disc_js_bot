
//THIS WORKS
module.exports = {
    name:'guess',
    cooldown: 60 * 1,
    description:'a message is sent to you and you have to guess who deleted it',
    async execute(message,args){
        const bot = args.pop();
        message.channel.send('I see you are in for a game of snipe guesser.\nI will send you a snipe and you will have to guess the username of the sender')
        //TODO ΣΙΓΟΥΡΑ ΜΠΟΡΕΙ ΝΑ ΓΙΝΕΙ ΛΙΓΟ ΚΑΛΥΤΕΡΑ refactor soon
        let randsnipesArray=bot.snipes.random();
        console.log('snipes are',randsnipesArray)
        const randSnipe = randsnipesArray[Math.floor(Math.random()*randsnipesArray.length)]
        console.log('the message is ',randSnipe);
        console.log('the keys are:',bot.snipes.keys())
        const allIDs = bot.snipes.keys();
        let theID;
        for (let id of allIDs){
            if(bot.snipes.get(id).includes(randSnipe)){
                theID = id;
                break;
            }
        }
        console.log(theID);
        const theguild = message.guild;
        const member = theguild.members.cache.get(theID);
        const username = member.user.username;
        console.log(username)
        
        const themsg = message.channel.send(`The message is ${randSnipe}.Who sent it?`)
        const filter = (msg)=>msg.author.id === message.author.id;
        const seconds = 60;
        message.channel.send(`You have ${seconds} to guess `)
        message.channel.awaitMessages(filter,
            {time:seconds*1000,max:1,errors:['time']})
            .then(collected =>{
                const nameguess = collected.first().content;
                if(nameguess === username){
                    message.channel.send(`Indeed it was ${username}\'s message(so embarassing to send such stuff).\nCongrats`)
                }else{
                    message.channel.send(`It wasn\'t sent by ${nameguess} and i guess you will never know who sent it `)
                }
            })
            .catch(collected => message.channel.send(`After a minute, you didnt guess.`))
        
        
        

    }
}