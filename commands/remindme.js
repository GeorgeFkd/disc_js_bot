const schedule = require("node-schedule");
const days = ["ΚΥΡΙΑΚΗ","ΔΕΥΤΕΡΑ","ΤΡΙΤΗ","ΤΕΤΑΡΤΗ","ΠΕΜΠΤΗ","ΠΑΡΑΣΚΕΥΗ","ΣΑΒΒΑΤΟ"];
const daysEn = ["SUNDAY","MONDAY",'TUESDAY','WEDNESDAY','THURSDAY',]

module.exports = {
    name:"remindme",
    description:"Sets a personal reminder",
    execute(message,args){
        console.log(args.length);
        //δυο δομες : ωρα και μηνυμα και ωρα μηνυμα και μερα
        //console.log(args[2]);
        const [hour,minutes] = args[0].split(".");
        let mydate,mymsg;
        if(args.length == 2) {
            mydate = new Date(); 
            mymsg = args.slice(1).join(" ");         
        } else if(args.length == 3){
            //2 cases :day specified is before and after or in one week
            const day = args[-1].toUpperCase();
            let index ;
            mymsg = args.slice(1,args.length-1).join(" ");
            if(days.includes(day)){
                index = days.indexOf(day);
            }else if(daysEn.includes(day)){
                index = daysEn.indexOf(day);
            }else{
                message.author.send("You didnt give me a proper to day to work with");
                throw Error;
            }
            let today = new Date().getDay();
            let datediff;
            if(index>today){
                datediff = index-today;
            }else{
                let i=0;
                //prwth ylopoihsh
                while(index!=today){
                    today++;
                    today = today%7;
                    i++;
                }
                datediff = i;
            }

            mydate = new Date();
            mydate = mydate.addDays(datediff);
            
        }

        mydate.setUTCSeconds(0);
        mydate.setUTCMinutes(minutes);
        mydate.setUTCHours(hour);
        console.log(mydate)
        console.log(new Date(mydate));
        const theFinalDate = new Date
        (mydate.getUTCFullYear(),
        mydate.getUTCMonth(),mydate.getUTCDate(),
        mydate.getUTCHours(),mydate.getUTCMinutes(),
        mydate.getUTCSeconds())
        console.log(theFinalDate);
        //It works 
        const job = schedule.scheduleJob(theFinalDate,function(){
            message.author.send(`your reminder you irresponsible asshat : ${mymsg}`);
        })
        message.author.send(`the reminder is set at: ${mydate.toDateString()} with details ${mymsg}`);

    }
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setUTCDate(date.getUTCDate() + days);
    return date;
};