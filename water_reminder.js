
const schedule = require("node-schedule");
const {waterReminders,testingGroundsId,remindersID,
    calcoholicsGuildID,remindmeplsRoleID} = require("./constants");
//TODO WRAPPER CLASSES GIA REMINDERS-> COURSEREMINDER-WATERREMINDER
function setWaterReminders(bot){
    
    const forWaterReminderMembers = bot.guilds.cache.get(calcoholicsGuildID)
  .members.cache.filter(user=>user._roles.includes(remindmeplsRoleID));
  console.log(forWaterReminderMembers);
  const ids = forWaterReminderMembers.map(m=>m.id)
  console.log(ids);
    const theChannel = bot.channels.cache.get(remindersID);
    theChannel.send("reminders are set and you shall wait");
    console.log(theChannel,waterReminders);
    let job;
    let mentions =[];
    for(let id of ids){
        mentions.push(`<@${id}>\n`);
        
    }
    let msg =mentions.join('');
    msg+="Being dead inside is not an excuse for not drinking water";
    console.log(msg);
    try {
        //TODO NEEDS REFACTOR ,ANYTHING JOB RELATED
        console.log("naughty for");
        for (let reminder of waterReminders) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = reminder.hour;
            rule.minute = reminder.minute;
            rule.tz = reminder.tz
            //mporw na balw kai message sto object
            job = schedule.scheduleJob(rule,function(){
                console.log("HOORAY")
                theChannel.send(msg);
            })
        }
            console.log("not job")
    } catch (err) {
        console.log(err);
    }
    console.log("all ok",job);
}

module.exports ={
    setWaterReminders
}