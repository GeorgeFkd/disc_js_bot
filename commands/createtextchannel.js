const email = require("./email");
const errorHandler = require('../utilities/error')
module.exports = {
    name:"createtextchannel",
    cooldown:25,
    requiredChannels:[],
    requiredRole:'entire circus',
    description:"creates a text channel with the specified names",
    execute(message,args){
        console.log(args.join(" "));
        const name = args.join(" ");
        console.log(name);
        //args.length == 1 ? args[0]:args.join(" ");
        const server = message.guild;
        
        server.channels.create(name,{
            type:"text",
        })
        .then((channel)=>{
            console.log(channel," created");
        })
        .catch((err)=>{
            errorHandler(message,err)
        })
        const theChannel = server.channels.cache.find(ch=>ch.name = name);
        const theCategory = server.channels.cache.find(c=> c.name == "📝current"
        && c.type =="category");
        console.log(theChannel,theCategory);
        theChannel.setParent(theCategory.id).then(()=>console.log("all ok"));         
        

    }
}