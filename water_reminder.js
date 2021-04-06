
const schedule = require("node-schedule");
const {waterReminders,testingGroundsId} = require("./constants");

function setReminders(bot){
    const theChannel = bot.channels.cache.get(testingGroundsId);
    theChannel.send("reminders are set and you shall wait");
    console.log(theChannel,waterReminders);
    let job;
    try {
        //TODO NEEDS REFACTOR ,ANYTHING JOB RELATED
        console.log("naughty for");
        for (let reminder of waterReminders) {
            const rule = new schedule.RecurrenceRule();
            rule.hour = reminder.hour;
            rule.minute = reminder.minute;
            rule.tz = reminder.tz
            job = schedule.scheduleJob(rule,function(){
                console.log("HOORAY")
                theChannel.send("Being dead inside is not an excuse for not drinking water");
            })
        }
            console.log("not job")
    } catch (err) {
        console.log(err);
    }
    console.log("all ok",job);
}

module.exports ={
    setReminders
}