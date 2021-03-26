const nonAppreciation = ['bad joke','disapointment',
                        'didnt laugh','not funny'];
const nonAppreciationResponse = ["im calling the fbi to see who asked",
                                "The cia is investigating who tf asked for your opinion",
                              'how come you think i care for your opinion?',
                              "I don't give a shit for your worthless opinion" ]

module.exports ={
    name:"badjoke",
    description:"you dont appreciate my humor",
    execute(message,args){
        if(nonAppreciation.some(str=>message.content
            .includes(str))){
                const index = Math.floor(Math.random()*
                nonAppreciation.length);
                message.reply(nonAppreciationResponse[index]);
            }

    }
}