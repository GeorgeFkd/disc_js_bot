
const {testingGroundsID, testingGroundsId} = require('./constants');
module.exports = (bot)=>{
    bot.on('guildMemberAdd',(member)=>{
        const message = `Καλωσήρθες <@${member.id} στον χριστιανό ορθόδοξο
        παλαιοημερολογίτικο σέρβερ μας.Τα μαξ 10 λειτουργικά εγκεφαλικά κύτταρα
        εδώ σε συνδυασμό με την αγάπη μας για τα memes και την έλλειψη context σε ότι λέμε
        δημιουργούν μια ,δυστυχώς για σένα,αξέχαστη εμπειρία`;
        const channel = member.guild.channels.cache.get(testingGroundsId);
        channel.send(message);
    })
}