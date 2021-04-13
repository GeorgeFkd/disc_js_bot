const SteamAPI = require('steamapi');


module.exports = {
    name:"csgo",
    description:"shows you the specified user's details",
    cooldown:10,
    requiredRole:"",
    requiredChannels:[],
    async execute(message,args){
        const steam = new SteamAPI('033A093C0803E06D45F5C28063EEA628')
        const username = args.join(' ')
        const id = await steam.resolve(`https://steamcommunity.com/id/${username}`)
        console.log(id);
        const summary = await steam.getUserSummary(id);
        //console.log(summary)
        const cs = await steam.getUserStats(id,'730')
        //console.log(cs);
        const stats = cs.stats
        //TODO NA GINEI SE EMBED AYTO 
        const msg = `Total kills:${stats.total_kills} Total Deaths:${stats.total_deaths} Total Wins:${stats.total_wins}`
        console.log(msg)
        message.reply(`Gamer:${username} With Stats\n${msg}`)
    }
}