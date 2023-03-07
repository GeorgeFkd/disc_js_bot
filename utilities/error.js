const { developerID } = require("../constants");

module.exports = function (message, err) {
    const dev = message.guild.members.cache.get(developerID);
    console.log(message);
    dev.send(
        `somebody caused an error ${err.toString()}:\n${
            message.content
        } message in channel${message.channel}`
    );
    const theLink = `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
    dev.send(`here is a link to it ${theLink}`);
};
