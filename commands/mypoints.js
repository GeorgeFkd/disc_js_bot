

module.exports = {
    name:"mypoints",
    description:"shows you the xp points",
    execute(message,args){
        message.reply(`your points are ${global.XP.get(message.author.id)}`)

    }
    
}