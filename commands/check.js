

const {remindmeplsRoleID,calcoholicsGuildID, clownMomentsID} = require("../constants");
const theid = "808391177845735445";
const fs = require('fs')
const terms = ['a 1','a 2','a 3','b 1','b 2','b 3','b 3','c 1','c 2','c 3'];
const chars = ['a','b','c']
const columns = ['1','2','3']
module.exports = {
    name:"check",
    description:"used for test purposes",
    cooldown: 25,
    requiredChannels:['playground','testing-ground-v2'],
    requiredRole:'',
    async execute(message,args){
        const bot = args.pop();
        console.log(message.channel.id)
        const theguild = message.guild
        
        const thechannel = theguild.channels.cache.get(clownMomentsID);
        
        const themessages = thechannel.messages.cache.map(msg=>msg.content);
        const dim = 3;//3+1

        


        
        const player = message.author.id
        let finished = false;
        let boardList = []
        for(let i =0;i<dim;i++){
            boardList.push([0,0,0])
        }
        let botWon,playerWon;
        console.log(boardList)
        let theBoard = drawBoard()
        message.channel.send(theBoard);

        const filter = (msg)=>{
            
            return msg.author.id === player && terms.includes(msg.content.toLowerCase()) 
        }
        let isFirstMove,botRow=-1,botCol=-1;
        while(!finished)
        {       
             
            message.channel.send('Που βάζεις?(γραμμα κενο αριθμος) ')
            await message.channel.awaitMessages(filter
                ,{time:10 * 1000,max:1,errors:['time']})
                .then(async(collected)=>{
                    let choice = collected.first().content
                    console.log('he sent',choice)
                    
                    let [row,column] = choice.split(' ')
                    const rowNum = chars.indexOf(row);
                    const colNum = Number(column)-1;
                    if(boardList[rowNum][colNum]===0) {
                        console.log('the indexes',rowNum,colNum);
                        console.log(row,column)
                        theBoard = redrawBoard(theBoard,rowNum,colNum,'x')
                        boardList[rowNum][colNum] = 1;
                        //if it is first then it has length 2
                        //TODO NA ALLAKSEI AYTO TO CONDITION
                        isFirstMove = theBoard.split('x').length-1===1?true:false
                        console.log('not the split',isFirstMove)
                        if(isFirstMove){
                            [botRow,botCol] = firstMove(rowNum,colNum)
                        }else{
                            let ok = checkIfEmptySquare(boardList)
                            console.log('ok',ok);
                            if(ok) {
                                let attack = tictactoeResponse(boardList,0.1);
                                let def = tictactoeResponse(boardList,1);
                                console.log('wtf is going on')
                                console.log(attack,def,boardList)
                                if(boardList[attack[0]][attack[1]]===0){
    
                                    console.log('the attack')
                                    botRow = attack[0];//ans[0];
                                    botCol = attack[1];//ans[1];
                                }else if(boardList[def[0]][def[1]]===0){
                                    botRow= def[0];//ans[0];
                                    botCol = def[1]
                                }else{
                                    console.log('randomized');
                                    botRow = Math.floor(Math.random()*3)
                                    botCol = Math.floor(Math.random()*3)
                                    
                                    while(boardList[botRow][botCol]!==0){
                                        botRow = Math.floor(Math.random()*3)
                                        botCol = Math.floor(Math.random()*3)
                                        console.log(botRow,botCol)
                                    }
                                }                                                                                
                                console.log('the choice',botRow,botCol)                            
                                console.table(boardList);
                            } else {
                                finished = true;
                                return message.channel.send('the game ended and you couldnt beat a helpless bot')
                            }
                            
                        }
                        boardList[botRow][botCol] = 0.1;
                        theBoard = redrawBoard(theBoard,botRow,botCol,'o')
                        botWon= gameFinished(boardList,0.1);
                        playerWon = gameFinished(boardList,1)
                        message.channel.send(theBoard);

                        if(playerWon){
                            finished = true; 
                            return message.channel.send('Seems like your only one left functioning braincell was enough to beat a mildly retarded bot')
                        }else if(botWon){
                            finished = true;
                            return message.channel.send('you lost to a stupid bot incompetent human being and you are worrying about AI taking your jobs')
                        }else{
                            if(!boardList.some(line=>line.includes(0))){                            
                                message.channel.send('I placed my move');
                            }
                        }                                    
                    }else{ //o xrhsths ebale se tetragwno poy hdh yphrxe
                        message.channel.send('That is illegal place your move properly thi time');
                    }
                })
                .catch(err=>console.log(err))
            //console.log('here hi hi',choice.content);
            
        }
        console.log('finished');
        
    }
}




String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function drawBoard(){
    let board= '.  .__    __.__    __.__    __.__    __.\n';
    //prwth seira ksekina to char index:47 
    //deyterh seira 80 
    //trith seira 113
    board+='a|__  ~  __|__  ~  __|__  ~  __|\n'
    board+='b|__  ~  __|__  ~  __|__  ~  __|\n'
    board+='c|__  ~  __|__  ~  __|__  ~  __|\n'
    board+='     1     2     3' 
    
    
    return board;
}

function redrawBoard(charboard,rowNum,colNum,char){
    const base = 47;//position of a1 
    const pos = base+rowNum*33+colNum*10
    console.log('pos',pos)
    charboard = charboard.replaceAt(pos,char)
   
    return charboard;
    

}

function checkIfEmptySquare(board){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]===0){
                return true;
            }
        }
    }
    return false;
}

function firstMove(moveCol,moveRow){
    let isAngle = (moveCol===0 || moveCol ===2) && (moveRow===0 || moveRow ===2)
    if(isAngle){
        return [1,1]//otan bazei gwnia prepei na bazw kentro
    }else{//ama den balei gwnia den se noiazei pou
        let i = Math.floor(Math.random()*2)
        let j = Math.floor(Math.random()*2)
        return [i,j];
    }
    
    
}

function gameFinished(board,val){
    let arr = [0,0,0,0]
    let totalInLine=0,firstDiag=0,sDiag=0,colSum=0;
    for(let i =0;i<3;i++){
        //totalInLine = board[i].reduce(add)
        
        firstDiag +=board[i][i];
        sDiag += board[i][board.length-1-i]
        for(let j=0;j<3;j++){
            totalInLine+=board[i][j];
            colSum+=board[j][i];
            
        }
        arr[0] = totalInLine;
        arr[1] = firstDiag;
        arr[2] = sDiag;
        arr[3] = colSum
        console.log(arr)
        if(arr.some(num=>num===val * 3)){
            return true;
        }

        totalInLine =0;
        colSum = 0;

  }
  return false;

}
function tictactoeResponse(board,val){
    let arr = [0,0,0,0]
    let totalInLine=0,firstDiag=0,sDiag=0,colSum=0;
    for(let i =0;i<3;i++){
        //totalInLine = board[i].reduce(add)
        
        firstDiag +=board[i][i];
        sDiag += board[i][board.length-1-i]
        for(let j=0;j<3;j++){
            totalInLine+=board[i][j];
            colSum+=board[j][i];
            
        }
        arr[0] = totalInLine;
        arr[1] = firstDiag;
        arr[2] = sDiag;
        arr[3] = colSum
        if(arr.some(num=>num===val * 2)){
            console.log('danger')
            //here we find the danger and just return the indexes
            let danger = arr.indexOf(val * 2);
            console.log('the danger',danger)
            //im checking if the sum is 2 bcs it means two 1s in somewhere 
            //so any 2 occurs is a danger
            switch(danger){
                case 0://the i line
                    //if(!board[i].some(num=> num ===0.1))
                    
                    console.log('shiit',i,board[i].indexOf(0))
                    return [i,board[i].indexOf(0)];
                    //if this is not true go to the next case
                case 1:{//the first diag
                    for(let sq;sq<3;sq++){                        
                        if(board[sq][sq]===0)//there is an empty spot{
                            console.log('shit',sq)
                            return [sq,sq];//case 1                         
                    }
                    
                }
                case 2:{//the second diag
                    console.log('s diag sus')
                    for(let sq=0;sq<3;sq++){   
                        console.log('ind',sq,2-sq)                     
                        if(board[2-sq][sq]===0)//there is an empty spot{
                            console.log('damn',sq)
                            return [2-sq,sq];//case 1                         
                    }
                    break;
                }
                case 3:{//the i column
                    for(let j =0;j<3;j++){
                        if(board[j][i]===0){
                            console.log('crap',j,i)
                            return [j,i];
                        }
                    }
                    break;
                    
                }
            }

        }
        totalInLine =0;
        colSum = 0;

  }
  return [2,3];

}
