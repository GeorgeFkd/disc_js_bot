const email = require("./email");

const { nonAppreciation, nonAppreciationResponse } = require("../constants");

module.exports = {
    name: "badjoke",
    cooldown: 0,
    requiredChannels: [],
    requiredRole: "",
    description: "you dont appreciate my humor",
    async execute(message, args) {
        if (nonAppreciation.some((str) => message.content.includes(str))) {
            const index = Math.floor(Math.random() * nonAppreciation.length);
            message.reply(nonAppreciationResponse[index]);
        }
    },
};
