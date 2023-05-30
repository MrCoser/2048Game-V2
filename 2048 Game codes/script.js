const scoreEl = document.getElementById('score');

let board = [[0,0,0,0], 
             [0,0,0,0],
             [0,0,0,0], 
             [0,0,0,0]];

let score = 0;
function startGame() {
    board = [[0,0,0,0], 
             [0,0,0,0],
             [0,0,0,0], 
             [0,0,0,0]
    ];
    addNewTile();
    addNewTile();
    updateBoard();
}

function addNewTile() {
    const  emptyTiles = [];

    for(let row = 0; row < 4; row++) {
        for(let col = 0; col < 4; col++) {
            if(board[row][col] == 0)
                emptyTiles.push({row,col});
        }
    }


    if(emptyTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyTiles.length);
        const {row,col} = emptyTiles[randomIndex];

        const newValue = Math.random() < 0.9 ? 2 : 4;
        board[row][col] = newValue;
    }
}


function updateBoard() {
    const gameBoard = document.getElementById("game_board");
    gameBoard.innerHTML = '';

    for(let r = 0; r < 4; r++) {
        for(let c = 0; c < 4; c++) {
            const tileVal = board[r][c];
            const tile = document.createElement('div');

            tile.className = 'tile';
            tile.textContent = tileVal !== 0 ? tileVal : '';
            tile.style.backgroundColor = getTileColor(tileVal);
            tile.style.color = [2,4,8].includes(tileVal) ? '#6b6359' : '#fff';


            gameBoard.appendChild(tile);
        }
    }
}


function getTileColor(value) {
    if(value == 0)  return "#c8bdae";

    const colors = ["#E7DFD3", "#E7DBBD", "#EFAC73", "#F4BE5F", "#EB7A54", "#F45B38", "#E8C96A", "#ECC95C"];
    for(let i in colors) {
        if((2**i) == value)
           return colors[i];
    }


    return "#ECC95C";
}


function moveTiles(direction) {
    let mov = false;
    const rowIndices = direction === "up" ? [0,1,2,3] : [3,2,1,0];
    const colIndices = direction === "left" ? [0,1,2,3] : [3,2,1,0];

    for(let row in rowIndices) {
        for(let col in colIndices) {
            const val = board[row][col];

            if(val == 0) continue;
            let newRow = row;
            let newCol = col;
            let currRow = row;
            let currCol = col;

            while(true) {
                if(direction === "up") {
                    newRow--;
                    currRow = newRow + 1;
                }

                else if(direction === "down") {
                    newRow++;
                    currRow = newRow - 1;
                }

                else if(direction === "left") {
                    newCol--;
                    currCol = newCol + 1;
                }

                else if(direction === "right") {
                    newCol++;
                    currCol = newCol - 1;
                }


                if(newRow < 0 || newRow >= 4 || newCol < 0 || newCol >= 4) {
                    newRow -= (direction === "up") ? -1 : 1;
                    newCol -= (direction === "left") ? -1 : 1;
                    break; 
                }


                const newValue = board[newRow][newCol];
                if(newValue === 0) {
                    board[newRow][newCol] = val;
                    board[currRow][currCol] = 0;
                    mov = true;
                }

                else if(newValue === val) {
                    board[newRow][newCol] += val;
                    board[currRow][currCol] = 0;
                    mov = true;
                    score += val;
                    scoreEl.innerText = score;
                    break;
                }

                else {
                    newRow -= (direction === "up") ? -1 : 1;
                    newCol -= (direction === "left") ? -1 : 1;
                    break; 
                }
            }
        }
    }

    if(mov === true) {
        addNewTile();
        updateBoard();
    }
}


document.addEventListener('keydown', function(event) {
    if(event.key === "ArrowUp")
       moveTiles("up");

    else if(event.key === "ArrowDown")
       moveTiles("down");
    
    else if(event.key === "ArrowLeft")
       moveTiles("left");

    else if(event.key === "ArrowRight")
       moveTiles("right");
});


const newGameBtn = document.getElementById("new-game-btn");
newGameBtn.addEventListener("click", startGame);
startGame();