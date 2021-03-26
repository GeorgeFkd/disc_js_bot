const fs = require("fs");
module.exports = {
    name:"check",
    description:"used for test purposes",
    execute(message,args){
        fs.readFile('🤡moments.txt','utf-8',(err,data)=>{
            if(err){
                console.error(err);
                return;
            }
            let dataArr = data.split(',').join().split('\n');
            dataArr = dataArr.filter((msg)=>!msg.includes("<@"));
            console.log(dataArr);
        })
    }
}