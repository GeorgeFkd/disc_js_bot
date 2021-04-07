
let rock_paper_scissors = ['🧻','🗿','✂️']
const util = require("../utilities/updateXP")
const {XPgains} = require("../constants");
function pointsOfOutcome(outcome,userID){
    
    switch(outcome){
        case 'defeat':
            return XPgains.lose;
        case 'victory':
            return XPgains.win
        case 'tie':
            return XPgains.tie;
        default:
            throw Error("wtf is this outcome ,that wasnt expected")
    }

}

module.exports = {
    name:"play",
    description:"you can play some mini games vs the bot",
    execute(message,args){
        const enemyID = message.author.id;
        const addReaction = (msg,emoji)=>{
            msg.react(emoji);
    
            setTimeout(()=>console.log('next'),500)
        
        }
        let outcome;
        const filter = (reaction,user)=>{
            return (rock_paper_scissors.includes(reaction.emoji.name)
            && user.id === enemyID)
        }
        rock_paper_scissors.map((emoji)=>{
            addReaction(message,emoji);
        })
        //global.sleep(500)
        //TODO ΝΑ ΜΠΟΥΝ ΔΙΑΦΟΡΕΤΙΚΑ MESSAGES
        message.awaitReactions(filter,{max: 1,time: 8 * 1000}).then(
            collected=>{
                const reaction = collected.first();
                console.log(reaction)
                const botChoice = Math.floor(Math.random()*3);
                console.log(botChoice);
                const enemyChoice = rock_paper_scissors.indexOf(reaction.emoji.name);
                if(botChoice+1%3 === enemyChoice){
                    message.channel.send('u lost')
                    outcome = 'defeat';
                }else if(botChoice === (enemyChoice+1)%3){
                    message.channel.send('u won');
                    outcome = 'victory'
                }else if(botChoice === enemyChoice){
                    message.channel.send('a worthy battle that ended with a tie');
                    outcome = 'tie'
                }
                console.log(enemyChoice,botChoice)
                const points = pointsOfOutcome(outcome,enemyID)
                util.updateXP(enemyID,points)
                console.log(points)
               
            }
        )

        
        
    }
}
