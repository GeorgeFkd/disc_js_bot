const {testingGroundsId} = require("../constants")
const email = require("./email")

module.exports = {
    name:"poll",
    cooldown:15,
    requiredChannels:[],
    description:"adds preference reactions to the last message in the same server",
    async execute(message,args){
        
        
    
        try {
            const addReactions = msg=>{
                msg.react('👍');
        
                setTimeout(()=>msg.react('👎'),500)
            
            }
            await message.delete();
            console.log("msg deleted")
    
            const fetched = await message.channel.messages.fetch({limit:1});
            if(fetched && fetched.first()){
                addReactions(fetched.first())
            }
        } catch (err) {
            email.execute(`the error happened in poll \n${err}`,[])
        }
    
        
    }
}
