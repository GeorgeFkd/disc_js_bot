# A Discord Bot

This project was made in Nodejs using the [discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome) library as a fun project for a server i was part of to experiment with the technologies involved.(Third Party APIs:Jooble,Steam,Reddit etc., discord.js library,nodemailer,axios,cron jobs)

For long this project was hosted on Heroku(PaaS) using the files-> Procfile and Procfile.TXT and has retired due to the server remaining inactive.

To make a discord bot somebody could begin with [this article](https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/), and then dive deeper into the discord.js library mentioned above(also many YT tutorials exist).

## Code Documentation

In index.js is the basic initialisation of the project and responding to events sent by Discord, through the discord.js library.

On the 'ready' event, some features execute their necessary setup while others don't need to.

Commands are read by the filename inside the /commands folder and activated when a server member sends !filename, e.g. !coin, by reading the contents of the folder and mapping each filename to its default export which then executes the command when called.

New commands can be added by adding files inside the command folder exporting an object with the same structure as in other files. 

The structure is of type:

{name:string,cooldown:number,requiredChannels:string [],requiredRoles:string,description:string,execute:(msg,args)=>void}

The project is not strongly typed(there is an intention of writing it in TS), any typing comes from the discord.js library.
