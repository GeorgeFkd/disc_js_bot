const axios = require('../node_modules/axios')
const relevantTerms = ['front-end','back-end','software','engineer','developer','full stack','προγραμματιστής']
const joobleApiKey = require('../config.json')['jooble-gr']
module.exports = {
    name:"motivation",
    description:"Sends you a motivational message to pursue your projects",
    cooldown:2*60*1000,
    requiredChannels:[],
    requiredRole:'',
    async execute(message,args){
        
        const thedata = await axios({
            method:'post',
            url:`https://gr.jooble.org/${joobleApiKey}`,
            data:{
                "keywords": "web-developer",
                "location": "",
                "radius": "80",
                "salary": "500",
                "page": "1"
            },

        })        
        const actualData = thedata.data.jobs.slice(1,7)
        const theSplit = actualData.map(j=>{
            let jobObj ={}
            let {title,salary,link,type} = j
            jobObj.title = title.toLowerCase()
            jobObj.salary = salary
            jobObj.link = link
            jobObj.type = type;            
            return jobObj

        })
        const relevantJobs = theSplit.filter((j)=>relevantTerms.some(term=>j.title.includes(term)))
        let msg = 'Salaries relevant to programming:\n'
        relevantJobs.map((job)=>msg+=`${job.title} is paid ${job.salary}\n`)
        message.channel.send(msg);

        

        
    }
}