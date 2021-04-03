
const fs = require('fs');
const schedule = require("node-schedule");
const readline = require('readline');
const email = require("./commands/email");
const {days,testingGroundsID} = require("./constants");
console.log(days,"days are");


function createRules(reminders,bot){
    //reminder:{course:,teacher:,day:,start:,end:,,link}

    let rules = [];
    let rules_info = [];
    try {
      for(let reminder of reminders){
        const {course,teacher,start,end,link,day} = reminder;
        const rule = new schedule.RecurrenceRule();
        let [hour,minutes] = start.split(".");
        rule.hour = hour
        rule.minute = minutes;
        rule.dayOfWeek = days.indexOf(day);
        rules.push(rule);
        let current_info = {};
        current_info.course = course;current_info.teacher = teacher;
        current_info.end = end;current_info.link = link; 
        rules_info.push(current_info);
        
      }
    } catch (err) {
      bot.send.get(testingGroundsID).send("something went wrong");
      email.execute(`the error happened in createRules \n${err}`,[])
    }
    return [rules,rules_info];
  
  }
  
function readScheduleFile(filename,bot){
//file pattern e.g.Αρχιτεκτονική Υπολογιστών|Ρουμελιώτης|ΔΕΥΤΕΡΑ|15.00|18.00|https://zoom.us/j/91923215916
    let reminders = [];
    const readInterface = readline.createInterface({
        input:fs.createReadStream(filename),
        output:process.stdout,
        console:false
    })
    try {
      readInterface.on('line',function(line){
          let mylineelems = line.split("|");          
          let reminder = {course:"",teacher:"",day:"",start:"",end:"",link:""};
          
          reminder.course = mylineelems[0];
          reminder.teacher = mylineelems[1];
          reminder.day = mylineelems[2];
          reminder.start = mylineelems[3];
          reminder.end = mylineelems[4];
          reminder.link = mylineelems[5];
          reminders.push(reminder);
  
      }).on('close',function(line){
          const [rules,rules_info] = createRules(reminders,bot);
          addRulesInSchedule(rules,rules_info,bot)
      });
    } catch (err) {
      bot.send.get(testingGroundsID).send("something went wrong");
      email.execute(`the error happened in readScheduleFile \n${err}`,[])
    }

    
}
function addRulesInSchedule(rules,rules_info,bot){
    let i,curr_info,curr_rule;
    console.log(rules);
    console.log("in addrules",rules.length);
    
    try {
      for(i=0;i<rules.length;i++){
  
        curr_rule = rules[i];
        curr_info = rules_info[i];
        
        addJob(curr_rule,curr_info,bot);
      }
    } catch (err) {
      bot.send.get(testingGroundsID).send("something went wrong");
      email.execute(`the error happened in addRulesInSchedule \n${err}`,[])
    }
}

  function addJob(curr_rule,curr_info,bot){
    
    try {
      const job = schedule.scheduleJob(curr_rule,function(){
          
          bot.channels.get(testingGroundsID).send(
            curr_info.course+'\n'+
            curr_info.teacher+'\n'+
            curr_info.link+'\n'
            )
  
        });
    } catch (err) {
      bot.send.get(testingGroundsID).send("something went wrong");
      email.execute(`the error happened in addJob \n${err}`,[])
    }
  }
  
  
  function initialiseScheduleJobs(filename,bot){
    readScheduleFile(filename,bot);  
  }

module.exports={
    name:"setupschedule",
    description:"gets data from a file and initializes the rules",
    execute(filename,bot){
      initialiseScheduleJobs(filename,bot)

    }

}