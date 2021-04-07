
let rock_paper_scissors = ['🧻','🗿','✂️']
module.exports = {
    name:"play",
    description:"you can play some mini games vs the bot",
    execute(message,args){
        const enemyID = message.author.id;
        const addReaction = (msg,emoji)=>{
            msg.react(emoji);
    
            setTimeout(()=>console.log('next'),500)
        
        }

        const filter = (reaction,user)=>{
            return (rock_paper_scissors.includes(reaction.emoji.name)
            && user.id === message.author.id)
        }
        rock_paper_scissors.map((emoji)=>{
            addReaction(message,emoji);
        })
        //TODO ΝΑ ΜΠΟΥΝ ΔΙΑΦΟΡΕΤΙΚΑ MESSAGES
        setTimeout(()=>message.awaitReactions(filter,{max: 1,time: 8 * 1000}).then(
            collected=>{
                const reaction = collected.first();
                console.log(reaction)
                const botChoice = Math.floor(Math.random()*3);
                console.log(botChoice);
                const enemyChoice = rock_paper_scissors.indexOf(reaction.emoji.name);
                if(botChoice+1%3 === enemyChoice){
                    message.channel.send('u lost')
                }else if(botChoice === (enemyChoice+1)%3){
                    message.channel.send('u won');
                }else if(botChoice === enemyChoice){
                    message.channel.send('a worthy battle that ended with a tie');
                }
                console.log(enemyChoice,botChoice)
                
               
            }
        ),500)
        
        
    }
}