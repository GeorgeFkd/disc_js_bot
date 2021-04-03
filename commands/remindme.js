const schedule = require("node-schedule");

const {days,daysEn} = require("../constants");


module.exports = {
    name:"remindme",
    description:"Sets a personal reminder for this day",
    execute(message,args){
        console.log(args.length);
        //δυο δομες : ωρα και μηνυμα και ωρα μηνυμα και μερα
        //TODO NA GINEI REFACTOR EDW
        const [hour,minutes] = args[0].split(".");
        let mydate,mymsg= args.slice(1).join(" ");;
        
        //     case 3:
        //         const day = args[-1].toUpperCase();
        //         let index ;
        //         mymsg = args.slice(1,args.length-1).join(" ");
        //         if(days.includes(day)){
        //             index = days.indexOf(day);
        //         }else if(daysEn.includes(day)){
        //             index = daysEn.indexOf(day);
        //         }else{
        //             message.author.send("You didnt give me a proper to day to work with");
        //             throw Error;
        //         }
        //         let today = new Date().getDay();
        //         let datediff;
        //         if(index>today){
        //             datediff = index-today;
        //         }else if (index<today){
        //             let i=0;
        //             //prwth ylopoihsh
        //             while(index!=today){
        //                 today++;
        //                 today = today%7;
        //                 i++;
        //             }
        //         }else if (index === today){
        //             datediff = 7;
        //         }
        //             datediff = i;
        //             break;
        // }

        const job = schedule.scheduleJob({hour:hour,minute:minutes,dayOfWeek:new Date().getDay()},function(){
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