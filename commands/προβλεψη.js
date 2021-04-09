
const fs = require('fs')
module.exports = {
    name:'προβλεψη',
    description:'Πλανητόσταλτη πρόβλεψη προσγειώνεται στην γη διαμέσου του πλανητάρχη',
    requiredRole:'πλανητάρχης',
    requiredChannels:['προβλεψεις'],
    execute(message,args){
        message.channel.send('Βοηθώντας τον Κόσμο,μια πρόβλεψη την φορά συνέχισε την καλή προσπάθεια');
        const content = message.content.replace('!προβλεψη','')
        console.log(content);

        fs.appendFileSync('predictions.txt',
         '\n1.'+ content.trim() + '|',{encoding:'utf-8'})
    }
}