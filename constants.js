
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
const needsBotAsArgs = ['help','snipe','morewater','check'];
const calcoholicsGuildID = "767468807328628776";
const greeceTimeZone = 'Etc/GMT-3'
const remindmeplsRoleID = "829034225499897856"
const {WaterReminder} = require("./reminders");
const messageForWater = "Being dead inside is not an excuse for not drinking water"
const featureReacts = ['💯','👌','🙅‍♀️']
const developerID = '366236180863385600';
let waterReminders = [
    new WaterReminder(19,30,greeceTimeZone,messageForWater),
    new WaterReminder(4,10,greeceTimeZone,messageForWater),
    new WaterReminder(3,0,greeceTimeZone,messageForWater),
    new WaterReminder(1,10,greeceTimeZone,messageForWater),
    new WaterReminder(23,30,greeceTimeZone,messageForWater),
    new WaterReminder(5,0,greeceTimeZone,messageForWater),
    new WaterReminder(6,0,greeceTimeZone,messageForWater),
    new WaterReminder(22,10,greeceTimeZone,messageForWater),
    new WaterReminder(15,30,greeceTimeZone,messageForWater),
    new WaterReminder(11,14,greeceTimeZone,messageForWater),
]


function addReminder(hour,minute){
    const reminder = new Reminder(hour,minute,greeceTimeZone)
    waterReminders.push(reminder);
    return reminder;
    
}

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
    addReminder,messageForWater,testingGroundsIDv2,
    featureReacts,developerID


}