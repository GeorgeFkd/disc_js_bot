module.exports = {
    name: "coin",
    cooldown: 0,
    requiredChannels: [],
    requiredRole: "",
    description: "tosses a coin for your decisions",
    execute(message, args) {
        const rand = Math.floor(Math.random() * 2 + 1);
        const msg = rand % 2 === 0 ? "Heads" : "Tails";
        message.reply(msg);
        // "Κορώνα" : "Γράμματα"
    },
};
