const boardDiv = document.querySelector('.board');

let turn = 1;

function changeTurn(){
  console.log("changeTurn",turn)
  if (turn===1){
    turn=2;
    return turn
  }
  else{
    turn=1;
    return turn
  }
}

function horizontalCheck(board){
  for (let i=0;i<board.length;i++){// NOTE: check Horizontal
    let firstValue = board[i][0];
    let win = board[i].every(value => value === firstValue);
    //check if the first item is the same with all the remaining array
    if (firstValue!=0&&win){
      alert(firstValue,"win")
      console.log("same value detected")
      return firstValue;
    }
    console.log("row =",i,"same values?",win,firstValue)
  }
}

function verticalCheck(board){
  for(let i=0;i<board[0].length;i++){// NOTE: check Vertical
    let arr = []
    for (let l=0;l<board.length;l++){
      arr.push(board[l][i])
    }
    let firstValue = arr[0];
    let win = arr.every(value => value === firstValue);
    console.log("column =",i,"same values?",win,firstValue)
    if (firstValue!=0&&win){
      alert(firstValue,"win")
      console.log("same value detected")
      return firstValue;
    }
  }
}

function diagonalCheck(board){
  let arr = []
  for (let l=0;l<board.length;l++){// NOTE: Diagonal Inverse
    arr.push(board[l][l])
  }
  let firstValue = arr[0];
  let win = arr.every(value => value === firstValue);
  console.log("diagonal inv ","same values?",win,firstValue)
  if (firstValue!=0&&win){
    alert(firstValue,"win")
    console.log("same value detected")
    return firstValue;
  }
  arr=[]
  for (let l=0;l<board.length;l++){ // NOTE: Diagonal
    arr.push(board[l][board.length-1-l])
  }
  firstValue = arr[0];
  win = arr.every(value => value === firstValue);
  console.log("diagonal","same values?",win,firstValue)
  console.log("arr",arr)
  if (firstValue!=0&&win){
    alert(firstValue,"win")
    console.log("same value detected")
    return firstValue;
  }
}

function boardReset(board){
  const reset = ()=>{
    const allImages = document.querySelectorAll('.playerSymbol');
    allImages.forEach(image => {
      allImages.parentNode.removeFirstChild(allImages);
    });
    //FIX:Reset is still not working
  }
  return{board,reset} }

function boardSimple(board){
  let firstScore = 0;
  let secondScore = 0;
  const{reset}=boardReset(board)
  const assign =(i,l)=>{
    console.log(turn,"boardSimple assign activated at",i,l)
    if (board[i][l]===0){
      board[i][l] = turn
      return board;
    }
  } 
  const createPlayerBoard=(name,div,score)=>{
    const playerNameDiv=document.createElement('div');
    playerNameDiv.className = 'playerName';
    playerNameDiv.textContent=name;
    const playerScoreDiv=document.createElement('div');
    playerScoreDiv.className = 'playerScore';
    playerScoreDiv.textContent = score;
    const playerBoardDiv = div;
    playerBoardDiv.appendChild(playerNameDiv)
    playerBoardDiv.appendChild(playerScoreDiv)
  }
  const insertUser=(score1,score2)=>{
    let user1=prompt("insert player 1's username","Player 1")
    let user2=prompt("insert player 2's username","Player 2")
    const board1Div = document.querySelector('.board1');
    const board2Div = document.querySelector('.board2');
    // board1Div.style.backgroundColor = "red";
    // board2Div.style.backgroundColor = "red";
    createPlayerBoard(user1,board1Div,score1)
    createPlayerBoard(user2,board2Div,score2)
    return(board1Div)
  }
  const make = (row,column)=>{
    for (let i = 0; i<row;i++){ //create rows

      board[i]=[]
      const ticRow = createRowDiv()

      for (let l = 0; l<column;l++){//create columns
        board[i][l]=0

        let click = true;
        const ticBlock = createBlock(i,l,click)
        ticRow.appendChild(ticBlock);
      }
      boardDiv.appendChild(ticRow)
    }
    return board
  }
  const check = function Check(board){
    console.log("Board is being checked")
    let horWin = horizontalCheck(board)
    let verWin = verticalCheck(board)
    let diaWin = diagonalCheck(board)
    let winArr = [horWin,verWin,diaWin]

    console.log("Board is checked. winner is")
    let winner = winArr.some(value => value !== undefined)
    console.log("winner exist?",winner)
    if (winner){
      alert(`Player ${turn} IS THE WINNER`)
      if (turn===1){
        firstScore++
        const board1Div = document.querySelector('.board1');
        board1Div.lastChild.textContent = firstScore;
        while (boardDiv.firstChild){
          boardDiv.removeChild(boardDiv.lastChild)
        }
        make(3,3)
      }
      else{
        secondScore++
        const board2Div = document.querySelector('.board2');
        board2Div.lastChild.textContent = secondScore;
        while (boardDiv.firstChild){
          boardDiv.removeChild(boardDiv.lastChild)
        }
        make(3,3)
      }
    }
  }
  const show = ()=>{
    console.log("boardSimple show activated",board)
  }
  const imageAdd = ()=>{
    const image = document.createElement('img');
    if (turn===1){
      image.src = 'icons8-cross-100.png';
      image.className = 'playerSymbol'
    }
    else{
      image.src = 'icons8-circle-100.png';
    }
    return image
  }
  const createRowDiv=()=>{
    const ticRowCreate=document.createElement('div');
    ticRowCreate.className = 'blockRow'
    return ticRowCreate
  }
  const createBlock=(i,l,click)=>{
    const ticBlockCreate=document.createElement('div');
    ticBlockCreate.className='block'
    ticBlockCreate.classList.add(`column${l}`);
    ticBlockCreate.classList.add(`row${i}`);
    ticBlockCreate.onclick = function(){
      if (click){
        ticBlockCreate.appendChild(imageAdd());
        console.log("Board is being clicked")
        if (board[i][l]===0){
          assign(i,l)
          show()
        }
        console.log("block clicked assign on =",i,l)
        check(board)
        changeTurn()
      }
      console.log("testing inheritance")
      show()
      click = false;
    }
    return ticBlockCreate
  }
  return{board,assign,check,show,imageAdd,reset,createRowDiv,createBlock,firstScore,secondScore,insertUser,createPlayerBoard,make}
}

function Board(board){
  const{assign,check,show,imageAdd,reset,createRowDiv,createBlock,firstScore,secondScore,insertUser,createPlayerBoard,make}=boardSimple(board)
  return{board,make,assign,check,show,firstScore,secondScore,insertUser,createPlayerBoard}
}

const gameFlow = (function(){
  const play = []
  const playBoard = Board(play)
  // console.log("test1")
  playBoard.make(3,3)
  playBoard.insertUser(playBoard.firstScore,playBoard.secondScore);
})();

// console.log("test2")
// playBoard.show()
// console.log("test3")
// console.log("test4")
// playBoard.show()
//FIX: Somehow show() shows the assigned value even if the value assign haven't declared yet
// Implement resets
// reset when there's no winner
