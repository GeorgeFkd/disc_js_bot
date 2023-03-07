const jokes = require("./give-me-a-joke");

module.exports = {
    name: "dadjoke",
    cooldown: 0,
    requiredChannels: [],
    requiredRole: "",
    description: "gets you an intense air exhaling dad joke",
    execute(message, args) {
        message.reply("im trying to stop crying bitch here is your damn joke");
        jokes.getRandomDadJoke(function (joke) {
            message.channel.send(joke);
        });
    },
};
