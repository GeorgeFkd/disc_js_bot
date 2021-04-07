
//TODO REFACTOR τους σερβερ εδω περα
const nonAppreciation = ['bad joke','disapointment',
'didnt laugh','not funny'];
const days = ["ΚΥΡΙΑΚΗ","ΔΕΥΤΕΡΑ","ΤΡΙΤΗ","ΤΕΤΑΡΤΗ","ΠΕΜΠΤΗ","ΠΑΡΑΣΚΕΥΗ","ΣΑΒΒΑΤΟ"];
const daysEn = ["SUNDAY","MONDAY",'TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']
const testingGroundsId = "824286927204909117";
const testingGroundsIDv2 = "829025431029940284";
const remindersID = "829032389262442516";
const clownMomentsID = '810928650513416242'
const nonAppreciationResponse = ["im calling the fbi to see who asked",
                                "The cia is investigating who tf asked for your opinion",
                              'how come you think i care for your opinion?',
                              "I don't give a shit for your worthless opinion" ]
const needsBotAsArgs = ['help','snipe','morewater'];
const calcoholicsGuildID = "767468807328628776";
const greeceTimeZone = 'Etc/GMT-3'
const remindmeplsRoleID = "829034225499897856"
const Reminder = require("./reminders");
let waterReminders = [
    new Reminder(19,30,greeceTimeZone),
    new Reminder(4,10,greeceTimeZone),
    new Reminder(3,0,greeceTimeZone),
    new Reminder(1,10,greeceTimeZone),
    new Reminder(23,30,greeceTimeZone),
    new Reminder(5,0,greeceTimeZone),
    new Reminder(6,0,greeceTimeZone),
    new Reminder(22,10,greeceTimeZone),
    new Reminder(15,30,greeceTimeZone),
    new Reminder(12,30,greeceTimeZone),
]


function addReminder(hour,minute){
    const reminder = new Reminder(hour,minute,greeceTimeZone)
    waterReminders.push(reminder);
    return reminder;
    
}
//TODO NA MPOYNE SE CLASS KAI ME CONSTRUCTOR NA TA FTIAXNW KAI NA XRHSIMOPOIHSW ETOIMO TO TIMEZONE
// const waterReminders = [{
//     hour:19,
//     minute:30,
//     tz:'Etc/GMT-3'
// },{
//     hour:4,
//     minute:10,
//     tz:'Etc/GMT-3'
// },{
//     hour:3,
//     minute:0,
//     tz:'Etc/GMT-3'
// },{
//     hour:1,
//     minute:10,
//     tz:'Etc/GMT-3'
// },{
//     hour:23,
//     minute:30,
//     tz:'Etc/GMT-3'
// },{
//     hour:5,
//     minute:0,
//     tz:'Etc/GMT-3'
// },{
//     hour:6,
//     minute:0,
//     tz:'Etc/GMT-3'
// },{
//     hour:22,
//     minute:10,
//     tz:'Etc/GMT-3'
// },{
//     hour:19,
//     minute:58,
//     tz:"Etc/GMT-3"
// },{
//     hour:0,
//     minute:29,
//     tz:"Etc/GMT-3"
// },

// ]
module.exports = {
    nonAppreciation,
    days,
    daysEn,
    testingGroundsId,
    clownMomentsID,
    nonAppreciationResponse,
    needsBotAsArgs,
    calcoholicsGuildID,
    waterReminders,
    remindersID,
    greeceTimeZone,
    remindmeplsRoleID,
    addReminder


}