const nodemailer = require("nodemailer");

module.exports = {
    name: "email",
    cooldown: 180,
    requiredChannels: [],
    requiredRole: "",
    description: "sending emails for catching error occurings",
    execute(message, args) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "geonfak76@gmail.com",
                pass: "imaingenji76",
            },
        });
        let theText;
        if (typeof message == Object) {
            //ama einai discord message
            theText = `Message Sent for the error:${message.content}\nFrom:${message.author.username}`;
        } else {
            //ama den einai discord message
            theText = `Message Sent for the error:${message}\nFrom:${args.join(
                " "
            )}`;
        }

        const mailOptions = {
            from: "geonfak76@gmail.com",
            to: "geon21gm@gmail.com",
            subject: "Discord Error in a server",
            text: theText,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("email sent: ", info.response);
            }
        });
    },
};
