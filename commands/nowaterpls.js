const { execute } = require("./email");
const { remindmeplsRoleID } = require("../constants");

module.exports = {
    name: "nowaterpls",
    description: "unsubscribe from the daily water reminders",
    requiredChannels: [],
    requiredRole: "remindmepls",
    async execute(message, args) {
        const guildMember = message.guild.members.cache.get(message.author.id);
        await guildMember.roles.remove(remindmeplsRoleID);
        message.reply(
            "Seems like you can do basic human stuff without being reminded congrats welcome to this cold hard life"
        );
    },
};
