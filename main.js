//variables
let tRows = document.getElementsByTagName('tr'); 
let tCells = document.getElementsByTagName('td'); 
let circles = document.querySelector('.circle');
let playerTurn = document.querySelector('#playerTurn');
let player1 = "Player 1";
let player2 = "Player 2";
player1Color = 'red';
player2Color = 'yellow';
let currentPlayer = 0; //this will be the counter which keeps track of who's turn it is
let drawCounter = 0;
let winCount = 1;

//starts the game showing Player 1
playerTurn.textContent = player1 + "'s turn!";
playerTurn.style.color = player1Color;

//listens for any time a circle is clicked and then changes the appropriate one's color
for (let i = 0; i < 42; i++){
    tCells[i].style.backgroundColor = 'white';
    tCells[i].addEventListener('click', changeColor);
    tCells[i].addEventListener('click', drawCondition); //counts up to 42 clicks then declares a draw
}

function changeColor(e){ 
    let col = e.target.cellIndex; //grabs the column of the circle clicked
    let row = 0;
    
    for (let i = 5; i > -1; i--){ //start at 5 because it needs to check the bottom of first
        if(tRows[i].children[col].style.backgroundColor == 'white'){ //if the current circle is white
            row = i;
            if(currentPlayer === 0){    
                //changes the circles color
                tRows[i].children[col].style.backgroundColor = player1Color; //changes the circles color
                
                //checks if this move just won the game
                if (winCondition(row, col)){
                    if (currentPlayer === 0){
                        alert("Player 1 has won the game!");
                    } else{
                        alert("Player 2 has won the game!");
                    }
                    resetBoard();
                    break;
                }
                
                drawCounter++; //updates the draw counter
                
                //updates whose turn it is and the counter
                playerTurn.textContent = player2 + "'s turn!";
                playerTurn.style.color = 'darkGoldenRod';
                return currentPlayer = 1; 
            } else{
                tRows[i].children[col].style.backgroundColor = player2Color;
                
                if (winCondition(row, col)){
                    if (currentPlayer === 0){
                        alert("Player 1 has won the game!");
                    } else{
                        alert("Player 2 has won the game!");
                    }
                    resetBoard();
                    break;
                } 
                
                drawCounter++;
                
                playerTurn.textContent = player1 + "'s turn!";
                playerTurn.style.color = player1Color;
                return currentPlayer = 0;
            }
        }
    }
}

function winCondition(row, col){ 
    if (checkUpRight(row,col) || checkDownLeft(row,col) || winCount == 4){
        return true;
    }
    winCount = 1;
    if (checkRight(row, col) || checkLeft(row, col) || winCount == 4){
        return true;
    }
    winCount = 1;
    if (checkDownRight(row, col) || checkUpLeft(row, col) || winCount == 4){
        return true;
    }
    winCount = 1;
    if (checkDown(row, col)){
        return true;
    } 
    winCount = 1;
    return false;
}

function checkUpRight(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row - 1, col + 1)){
        updateWinCount();
        if (checkUpRight(row - 1, col + 1)){
            return true;
        }
    }
    return false;
}

function checkDownLeft(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row + 1, col - 1)){
        updateWinCount();
        if (checkDownLeft(row + 1, col - 1)){
            return true;
        }
    }
    return false;
}

function checkRight(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row, col + 1)){
        updateWinCount();
        if (checkRight(row, col + 1)){
            return true;
        }
    }
    return false;
}

function checkLeft(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row, col - 1)){
        updateWinCount();
        if (checkLeft(row, col - 1)){
            return true;
        }
    }
    return false;
}

function checkDownRight(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row + 1, col + 1)){
        updateWinCount();
        if (checkDownRight(row + 1, col + 1)){
            return true;
        }
    }
    return false;
}

function checkUpLeft(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row - 1, col - 1)){
        updateWinCount();
        if (checkUpLeft(row - 1, col - 1)){
            return true;
        }
    }
    return false;
}

function checkDown(row, col){
    if (winCount == 4){
        return true;
    }
    if (isValidMove(row + 1, col)){
        updateWinCount();
        if (checkDown(row + 1, col)){
            return true;
        }
    }
    return false;
}

function isValidMove(row, col){
    let currentColor;
    if(currentPlayer == 0){
        currentColor = player1Color;
    } else {
        currentColor = player2Color;
    }
    if (row < 0 || col < 0 || row > 5 || col > 6){ //makes sure the move is within the game boundaries
        return false;
    } 
    if (tRows[row].children[col].style.backgroundColor != currentColor){ //makes sure the colors are the same
        return false;
    } else {
        return true;
    }   
}

function updateWinCount(){
    winCount++;
}

function resetBoard(e){                                             
    currentPlayer = 0;
    drawCounter = 0;
    winCount = 1;
    for (let i = 0; i < 42; i++){
        tCells[i].style.backgroundColor = 'white';
    }
    playerTurn.textContent = player1 + "'s turn!";
    playerTurn.style.color = player1Color;
}

function drawCondition(e){
    if (drawCounter == 42){
        alert("There has been a draw.");
        resetBoard();                                               
    }
}