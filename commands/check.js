const terms = [
    "a 1",
    "a 2",
    "a 3",
    "b 1",
    "b 2",
    "b 3",
    "b 3",
    "c 1",
    "c 2",
    "c 3",
];
const chars = ["a", "b", "c"];

const columns = ["1", "2", "3"];
module.exports = {
    name: "check",
    description: "used for test purposes",
    cooldown: 25,
    requiredChannels: ["playground", "testing-ground-v2"],
    requiredRole: "",
    async execute(message, args) {
        console.log(message.channel.id);
        const dim = 3; //3+1
        const player = message.author.id;
        let finished = false;
        let boardList = [],
            botWon,
            playerWon; //holds the tictactoe board
        for (let i = 0; i < dim; i++) {
            boardList.push([0, 0, 0]);
        }
        console.log(boardList);
        let theBoard = drawBoard(); //the string representing the board
        message.channel.send(theBoard);

        const filter = (msg) =>
            (msg.author.id === player &&
                terms.includes(msg.content.toLowerCase())) ||
            msg.content.toLowerCase().includes("stop");
        //checks that the player is responding
        let turns = 0;

        while (!finished) {
            message.channel.send("Που βάζεις?(γραμμα κενο αριθμος) ");
            await message.channel
                .awaitMessages(filter, {
                    time: 10 * 1000,
                    max: 1,
                    errors: ["time"],
                })
                .then(async (collected) => {
                    let ans = collected.first().content;
                    if (ans === "stop") {
                        finished = true;
                        return;
                    }
                    let [row, column] = ans.split(" ");
                    const rowNum = chars.indexOf(row);
                    const colNum = Number(column) - 1;
                    if (boardList[rowNum][colNum] !== 0) {
                        await message.channel.send("U blind?");
                        return;
                    }
                    //here we are with a proper place;
                    turns++;
                    console.log("the indexes", rowNum, colNum);
                    console.log(row, column);
                    theBoard = redrawBoard(theBoard, rowNum, colNum, "x");
                    boardList[rowNum][colNum] = 1;
                    //TODO NA ALLAKSEI AYTO TO CONDITION
                    if (turns === 1) {
                        [botRow, botCol] = firstMove(boardList, rowNum, colNum);
                    } else {
                        let ok = boardList.some((line) => line.includes(0)); //there exists an empty square
                        console.log("ok", ok);
                        if (ok) {
                            //bot plays
                            ({ botRow, botCol } = botDecision(
                                boardList,
                                botRow,
                                botCol
                            ));
                        } else {
                            playerWon = gameFinished(boardList, 1);
                            finished = true;
                            if (playerWon)
                                return message.channel.send(
                                    "hooray u are better than a mediocre bot"
                                );
                            return message.channel.send(
                                "the game ended and you couldnt beat a helpless bot"
                            );
                        }
                    }
                    turns++;
                    boardList[botRow][botCol] = 0.1;
                    theBoard = redrawBoard(theBoard, botRow, botCol, "o");
                    botWon = gameFinished(boardList, 0.1);
                    playerWon = gameFinished(boardList, 1);

                    if (playerWon) {
                        finished = true;
                        return message.channel.send(
                            "Seems like your only one left functioning braincell was enough to beat a mildly retarded bot"
                        );
                    }
                    if (botWon) {
                        finished = true;
                        return message.channel.send(
                            "you lost to a stupid bot incompetent human being and you are worrying about AI taking your jobs"
                        );
                    }
                    if (!boardList.some((line) => line.includes(0))) {
                        return message.channel.send("I placed my move");
                    }
                    message.channel.send(theBoard);
                })
                .catch((err) => console.log(err));
        }
        console.log("finished");
    },
};

String.prototype.replaceAt = function (index, replacement) {
    return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
    );
};

function botDecision(boardList, botRow, botCol) {
    let attack = tictactoeResponse(boardList, 0.1);
    let def = tictactoeResponse(boardList, 1);
    console.log("wtf is going on");
    console.log(attack, def, boardList);

    if (boardList[attack[0]][attack[1]] === 0) {
        console.log("the attack");
        return { botRow: attack[0], botCol: attack[1] };
    }
    if (boardList[def[0]][def[1]] === 0) {
        console.log("the def");
        return { botRow: def[0], botCol: def[1] };
    }

    console.log("randomized");
    do {
        botRow = Math.floor(Math.random() * 3); //[0,1,2]
        botCol = Math.floor(Math.random() * 3);
    } while (boardList[botRow][botCol] !== 0);

    console.log("the choice", botRow, botCol);
    console.table(boardList);

    return { botRow, botCol };
}
//nnttt
function drawBoard() {
    let board = ".  .__    __.__    __.__    __.__    __.\n";
    //prwth seira index:47 deyterh 80 trith 113
    board += "a|__  ~  __|__  ~  __|__  ~  __|\n";
    board += "b|__  ~  __|__  ~  __|__  ~  __|\n";
    board += "c|__  ~  __|__  ~  __|__  ~  __|\n";
    board += "     1     2     3";
    return board;
}
//nnttt
function redrawBoard(charboard, rowNum, colNum, char) {
    const base = 47; //position of a1
    const pos = base + rowNum * 33 + colNum * 10;
    charboard = charboard.replaceAt(pos, char);
    return charboard;
}

function firstMove(boardList, moveCol, moveRow) {
    let isAngle =
        (moveCol === 0 || moveCol === 2) && (moveRow === 0 || moveRow === 2);
    if (isAngle) {
        return [1, 1]; //otan bazei gwnia prepei na bazw kentro
    } //ama den balei gwnia den se noiazei pou
    let botRow, botCol;
    do {
        botRow = Math.floor(Math.random() * 3); //[0,1,2]
        botCol = Math.floor(Math.random() * 3);
    } while (boardList[botRow][botCol] !== 0);

    return [botRow, botCol];
}
function gameFinished(board, val) {
    let arr = [0, 0, 0, 0];
    let [totalInLine, firstDiag, sDiag, colSum] = arr;
    for (let i = 0; i < 3; i++) {
        firstDiag += board[i][i];
        sDiag += board[i][board.length - 1 - i];
        for (let j = 0; j < 3; j++) {
            totalInLine += board[i][j];
            colSum += board[j][i];
        }
        arr = [totalInLine, firstDiag, sDiag, colSum];
        console.log(arr);
        if (arr.some((num) => num === val * 3)) {
            return true;
        }

        totalInLine = 0;
        colSum = 0;
    }
    return false;
}
function tictactoeResponse(board, val) {
    let arr = [0, 0, 0, 0];
    let [totalInLine, firstDiag, sDiag, colSum] = arr;
    //practically the other way around but irrelevant
    for (let i = 0; i < 3; i++) {
        firstDiag += board[i][i];
        sDiag += board[i][board.length - 1 - i];
        for (let j = 0; j < 3; j++) {
            totalInLine += board[i][j];
            colSum += board[j][i];
        }
        arr = [totalInLine, firstDiag, sDiag, colSum];
        if (arr.some((num) => num === val * 2)) {
            console.log("danger");
            //here we find the danger and just return the indexes
            let danger = arr.indexOf(val * 2);
            console.log("the danger", danger);
            //im checking if the sum is 2 * value bcs it means two 1s(2*1) in somewhere [without a 0.1]
            //so any 2 occurs is a danger
            if (danger === 0) {
                console.log("shiit", i, board[i].indexOf(0));
                return [i, board[i].indexOf(0)];
            }

            if (danger === 1) {
                for (let sq; sq < 3; sq++) {
                    if (board[sq][sq] === 0) {
                        //there is an empty spot{
                        console.log("shit", sq);
                        return [sq, sq]; //case 1   }
                    }
                }
            }

            if (danger === 2) {
                console.log("s diag sus");
                for (let sq = 0; sq < 3; sq++) {
                    console.log("ind", sq, 2 - sq);
                    if (board[sq][2 - sq] === 0) {
                        //there is an empty spot{
                        console.log("damn", sq);
                        return [sq, 2 - sq]; //case 1
                    }
                }
            }

            if (danger === 3) {
                for (let j = 0; j < 3; j++) {
                    if (board[j][i] === 0) {
                        console.log("crap", j, i);
                        return [j, i];
                    }
                }
            }
        }
        totalInLine = 0;
        colSum = 0;
    }
    return [2, 3]; //some illegal value so we know to randomize
}
