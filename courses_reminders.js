const fs = require("fs");
const readline = require("readline");
const email = require("./commands/email");
const {
    days,
    testingGroundsID,
    greeceTimeZone,
    calcoholicsGuildID,
    testingGroundsIDv2,
    remindersID,
} = require("./constants");
console.log(days, "days are");
const { CourseReminder } = require("./reminders");

function setCourseReminders(filename, bot) {
    //file pattern e.g.Αρχιτεκτονική Υπολογιστών|Ρουμελιώτης|ΔΕΥΤΕΡΑ|15.00|18.00|https://zoom.us/j/91923215916
    let reminders = [];
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false,
    });
    try {
        readInterface
            .on("line", function (line) {
                let mylineelems = line.split("|");
                let [course, teacher, day, start, end, link] = mylineelems;
                const [hour, minute] = start.split(".");
                const dayIndex = days.indexOf(days); //TODO na to ftiaksw na dexetai agglika
                const reminder = new CourseReminder(
                    hour,
                    minute,
                    greeceTimeZone,
                    course,
                    teacher,
                    link,
                    dayIndex,
                    end
                );
                reminders.push(reminder);
            })
            .on("close", function (line) {
                const theChannel = bot.channels.cache.get(remindersID);
                reminders.map((reminder) =>
                    setUpReminder(reminder, theChannel, "")
                );
                //xwris mention einai ta courseReminders προς το παρον τουλαχιστον
            });
    } catch (err) {
        bot.channels.cache.get(testingGroundsID).send("something went wrong");
        email.execute(`the error happened in readScheduleFile \n${err}`, []);
    }
}
function setUpReminder(reminder, theChannel, mentions) {
    //IT WORKS
    reminder.setMentions(mentions);
    reminder.setReminderMessage();
    reminder.setReminder(theChannel);
}

module.exports = setCourseReminders;
