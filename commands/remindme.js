const schedule = require("node-schedule");

const {days,daysEn} = require("../constants");


module.exports = {
    name:"remindme",
    cooldown:15,
    requiredChannels:[],
    requiredRole:'',
    description:"Sets a personal reminder for this day",
    execute(message,args){
        console.log(args.length);
        //δυο δομες : ωρα και μηνυμα και ωρα μηνυμα και μερα
        //TODO NA GINEI REFACTOR EDW
        const [hour,minutes] = args[0].split(".");
        let mymsg= args.slice(1).join(" ");;
        
        const date = new Date()
        const utcdate = new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()))//.getDay();
        day = utcdate.getUTCDay();
        console.log(day,utcdate,"good ole",date);
        const job = schedule.scheduleJob({hour:hour,minute:minutes,dayOfWeek:day,tz:"Etc/GMT-3"},function(){
            message.author.send(`your reminder you irresponsible asshat : ${mymsg}`);
        })
        job.isOneTimeJob = true;
        console.dir(job);
        message.author.send(`the reminder is set at: ${hour}:${minutes} with details ${mymsg}`);

    }
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setUTCDate(date.getUTCDate() + days);
    return date;
};

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }