const { developerID } = require("../constants");
module.exports = {
    name: "rolerequest",
    description:
        "used to request a specific role from the guild owner[but for now godgeon]",
    requiredRole: "",
    cooldown: 60 * 5,
    requiredChannels: [], //specific channel discussing this stuff
    execute(message, args) {
        //there might be a more appropriate method
        const content = message.content.replace(`!${this.name}`, "").trim();
        //it needs this bcs an '' is the first element for some reason

        let str = content.split(" ");
        console.log(str, str[0], str.slice(1).join(" "));
        //TODO THERE IS PROBABLY A BETTER WAY
        let [askedRole, reason] = [str[0], str.slice(1).join(" ")];
        //TODO CHECK IF ASKED ROLE EXISTS
        //*probably the owner here but anyway
        const dev = message.guild.members.cache.get(developerID);
        let themsg = "A role request was made:\n";
        themsg += `The role: ${askedRole}\n`;
        themsg += `The Reason: ${reason}\n`;
        //*i can plug in more information if needed
        dev.send(themsg);
        const theLink = `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;
        dev.send(`here is a link to it ${theLink}`);
        console.log("THE REASON", reason);
        console.log("the role", askedRole);
    },
};
