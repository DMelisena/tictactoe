const boardDiv = document.querySelector('.board');

let turn = 1;

function changeTurn(){
  console.log("changeTurn",turn)
  if (turn==1){
    turn=2;
    return turn
  }
  else{
    turn=1;
    return turn
  }
}

function Gameboard(column,row){
  let board = [];

  for (let i = 0; i<row;i++){
    board[i]=[]
    for (let l = 0; l<column;l++){
      board[i][l]=0
    }
  }
  return board
}

function horizontalCheck(board){
  for (let i=0;i<board.length;i++){// NOTE: check Horizontal
    let firstValue = board[i][0];
    let win = board[i].every(value => value === firstValue);
    //console.log("win?",win,firstValue)
    //console.log(firstValue!=0)
    //console.log(win==true)
    if (firstValue!=0&&win==true){
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
    if (firstValue!=0&&win==true){
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
  if (firstValue!=0&&win==true){
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
  if (firstValue!=0&&win==true){
    alert(firstValue,"win")
    console.log("same value detected")
    return firstValue;
  }
}

function Board(board){
  const make = (row,column)=>{
    for (let i = 0; i<row;i++){
      board[i]=[]

      const ticRow=document.createElement('div');
      ticRow.className = 'blockRow'
      ticRow.classList.add(`blockRow${i}`);

      for (let l = 0; l<column;l++){
        board[i][l]=0

        const ticBlock=document.createElement('div');
        ticBlock.className='block'
        ticBlock.classList.add(`column${l}`);
        ticBlock.classList.add(`row${i}`);
        ticRow.appendChild(ticBlock);

        let click = true;
        ticBlock.onclick = function(){
          if (click==true){
            console.log("Board is being clicked")
            const image = document.createElement('img');
            if (turn==1){
              image.src = 'icons8-cross-100.png';
            }
            else{
              image.src = 'icons8-circle-100.png';
            }
            if (board[i][l]==0){
              board[i][l] = turn
            }
            console.log("block clicked assign on =",i,l)
            console.log(board)
            ticBlock.appendChild(image);
          }
            let horWin = horizontalCheck(board)
            if(horWin==true){
              alert(`${turn} WON`)
            }
            let verWin = verticalCheck(board)
            if(verWin==true){
              alert(`${turn} WON`)
            }
            let diaWin = diagonalCheck(board)
            if(diaWin==true){
              alert(`${turn} WON`)
            }
            changeTurn()
          click = false;
        }
      }
      boardDiv.appendChild(ticRow)

    }
    return board
  }
  const assign =(i,l,input)=>{
    console.log(input,"is assigned at",i,l)
    if (board[i][l]==0){
      board[i][l] = input
      return board;
    }
  } 
  const check = function Check(board){
    console.log("Board is being checked")
    let horWin = horizontalCheck(board)
    let verWin = verticalCheck(board)
    let diaWin = diagonalCheck(board)
    let winArr = [horWin,verWin,diaWin]

    return winArr.some(value => value !== undefined)
  }
  const show = ()=>{
    console.log("result",board)
    alert("result",board)
  }
  return{board,make,assign,check,show}
}

const play = []
const playBoard = Board(play)

console.log("test1")
playBoard.make(3,3)
console.log("test2")
playBoard.show()
console.log("test3")
console.log("test4")
playBoard.show()
//FIX: Somehow show() shows the assigned value even if the value assign haven't declared yet

const ticBlock=document.createElement('div');
