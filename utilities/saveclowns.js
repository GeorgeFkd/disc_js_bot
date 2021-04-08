

const {clownMomentsID,calcoholicsGuildID} = require('../constants')
const fs = require('fs');
async function saveclownsMessages(themessage){

    // const theguild = bot.guilds.cache.get(calcoholicsGuildID)
    
    // const thechannel = theguild.channels.cache.get(clownMomentsID);
    // console.log(thechannel);
    //  const themessage = await thechannel.messages.fetch({limit:1})
    //  console.log(themessage)
    fs.appendFileSync('🤡moments.txt',
    themessage + '\n',{encoding:'utf-8'})
    
    
}

module.exports = saveclownsMessages;