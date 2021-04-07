
const {waterReminders,testingGroundsId,remindersID,
    calcoholicsGuildID,remindmeplsRoleID,messageForWater} = require("./constants");
//TODO WRAPPER CLASSES GIA REMINDERS-> COURSEREMINDER-WATERREMINDER
//TODO NA BALW MIA GENIKH SYNARTHSH setreminders pou na bazei ola ta reminder
//THIS WORKS
const schedule = require("node-schedule");
function setWaterReminders(bot){
    const guild = bot.guilds.cache.get(calcoholicsGuildID);
    const forWaterReminderMembers = guild.members.cache
    .filter(user=>user._roles.includes(remindmeplsRoleID));

    const mentions = forWaterReminderMembers.map(m=>`<@${m.id}`)
    const theChannel = bot.channels.cache.get(remindersID);

    let job;
    
    let msg =mentions.join('\n');
    msg+=`\n${messageForWater}`;
    try {
        waterReminders.map((reminder)=>setUpReminder(reminder,theChannel,mentions))
        
        
    } catch (err) {
        console.log(err);
    }
}
function setUpReminder(reminder,theChannel,mentions){
    //IT WORKS 
    reminder.setMentions(mentions)
    reminder.setReminderMessage()
    reminder.setReminder(theChannel);
}
//auto tha mporouse na einai sthn klash
module.exports ={
    setWaterReminders
}