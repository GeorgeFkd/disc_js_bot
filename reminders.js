
const schedule = require("node-schedule");
const {messageForWater} = require("./constants")
class Reminder{

    constructor(hour,minute,tz){
        if (this.constructor === Reminder) {
            throw new Error("Cannot instantiate this class");
        }
        //works
        this.hour = hour;
        this.minute = minute;
        this.tz = tz;
    }
     message;
     mentions;
     setReminderMessage(){
        message = mentions + this.message;
    }
    setMentions(mentions){
        this.mentions = mentions;
    }
    
}
Reminder.prototype.addReminderMessage = function(){
    

}
Reminder.prototype.setReminder = function(){
    
}

class WaterReminder extends Reminder{

    constructor(hour,minute,tz,message){
        super(hour,minute,tz);
        
        this.message = message;
        console.log('asdasdasd',this.message)
    }
    //message = messageForWater;
    mentions;
    setReminder(theChannel){
        
        const rule = new schedule.RecurrenceRule();
        rule.hour = this.hour;
        rule.minute = this.minute;
        rule.tz = this.tz;
        
        const job = schedule.scheduleJob(rule,()=>{
            theChannel.send(this.message)
        })
    }
    setMentions(mentions){
        this.mentions = mentions;
        console.log("naisu")
    }
    setReminderMessage(){
        this.message = this.mentions +'\n'+ this.message;
        console.log(this.message)//gia swsth seira einai etsi
    }
}



//TODO NA BALW NA KANEI THN ANANEWSH KATHE FORA POY GINETAI NEW KAI NA FTIAXNEI TO JOB
module.exports = {
    WaterReminder
};