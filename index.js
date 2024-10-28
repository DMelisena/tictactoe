
function Gameboard(column,row){
  var board = [];

  for (let i = 0; i<row;i++){
    board[i]=[]
    for (let l = 0; l<column;l++){
      board[i][l]=0
    }
  }
  return board
}

let play = Gameboard(3,3)

alert(play)
console.log(play)

play[0][2]=1
play[1][1]=1
play[2][0]=1

// play[0][0]=1
// play[0][1]=1
// play[0][2]=1
alert(play)
function horizontalCheck(board){
  for (let i=0;i<board.length;i++){// NOTE: check Horizontal
    let firstValue = board[i][0];
    var win = board[i].every(value => value === firstValue);
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
function Check(board){
  console.log("Board is being checked")
  let horWin = horizontalCheck(board)
  let verWin = verticalCheck(board)
  let diaWin = diagonalCheck(board)
  console.log(horWin,verWin,diaWin)
}

alert(play)

console.log("check = ",Check(play))
