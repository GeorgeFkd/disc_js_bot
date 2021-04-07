
const schedule = require("node-schedule");
const {messageForWater,days,daysEn} = require("./constants")
class Reminder{//abstract class

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


class CourseReminder extends Reminder{
    constructor(hour,minute,tz,course,teacher,link,dayOfWeek,end){
        super(hour,minute,tz);
        this.course = course;
        this.teacher = teacher;
        this.link = link;
        this.dayOfWeek = dayOfWeek;
        this.end = end;//string for diplay purposes only

    }

    setReminder(theChannel){
        
        const rule = new schedule.RecurrenceRule();
        rule.hour = this.hour;
        rule.minute = this.minute;
        rule.tz = this.tz;
        rule.dayOfWeek = this.dayOfWeek;
        const job = schedule.scheduleJob(rule,()=>{
            theChannel.send(this.message+'\n'+this.link)
        })
    }
    setMentions(mentions){
        this.mentions = mentions;

    }
    setReminderMessage(){
        //TODO LIGH DOYLITSA EDW
        this.message = this.teacher +'\n'+ this.course ;
        //gia swsth seira einai etsi
    }

}



//TODO NA BALW NA KANEI THN ANANEWSH KATHE FORA POY GINETAI NEW KAI NA FTIAXNEI TO JOB
module.exports = {
    WaterReminder,
    CourseReminder
};