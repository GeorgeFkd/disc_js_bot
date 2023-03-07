module.exports = {
    name: "help",
    cooldown: 30,
    requiredChannels: [],
    requiredRole: "",
    description:
        "Shows the user all the available commands and their functionality",
    execute(message, args) {
        console.log(args);
        const theBot = args[-1];
        console.log(theBot.commands.get("badjoke"));
        let msg = "";
        for (const command of theBot.commands) {
            console.log(command);
            const theCommand = command[1];
            msg += `\n!${theCommand.name} Description: ${theCommand.description}\n`;
            console.log(theCommand.description);
        }

        console.log(msg);
        message.channel.send(msg);
    },
};
