module.exports = {
    name: "ping",
    cooldown: 0,
    description: "Ping!",
    requiredChannels: [],
    requiredRole: "",
    execute(message, args) {
        message.channel.send("Pong.");
    },
};
