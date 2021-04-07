
const {addReminder,greeceTimeZone,remindersID} = require("../constants");
const Reminder = require("../reminders");
const schedule = require("node-schedule");
module.exports = {
    name:"morewater",
    description:"adds a water reminder [for everybody] in the specified hour and minute",
    execute(message,args){
        const thebot = args[args.length-1];//teleytaio stoixeio
        args = args.slice(0,args.length-1);
        args= args.join('');//epeidh erxetai san pinakas
        const [hour,minute] = args.split(".");
        const reminder = addReminder(hour,minute);
        //TODO AYTO NA PAEI KAPOY ALLOY KAI NA PROSTETHEI TO MESSAGE
        const theChannel = message.guild.channels.cache.get(remindersID);
        
        const rule = new schedule.RecurrenceRule();
        rule.hour = reminder.hour;
        rule.minute = reminder.minute;
        rule.tz = reminder.tz
        const job = schedule.scheduleJob(rule,function(){
            console.log('Hooray')

        })
        //console.log(theChannel)
        console.log(hour,minute);

        
    }
}