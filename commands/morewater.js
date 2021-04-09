
const {addReminder,greeceTimeZone,remindersID} = require("../constants");
const Reminder = require("../reminders");
const schedule = require("node-schedule");
module.exports = {
    name:"morewater",
    cooldown:10,
    requiredChannels:[],
    description:"adds a water reminder [for everybody] in the specified hour and minute",
    execute(message,args){
        message.channel.send("this was a bad idea so deleted")

        
    }
}