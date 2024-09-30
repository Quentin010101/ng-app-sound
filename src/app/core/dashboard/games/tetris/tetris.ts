import { LBlock, Line, Piece, ReverseLBlock, Square, SquigellingLeft, SquigellingRight, TBlock } from "./tetrisClass"


let pieceSize = 4 // Size of the piece container
let columnNumber = 10
let rowNumber = 20 + pieceSize
let timer = 0
let timerReset = 100
let grid: number[][] = []
let gridForPiece: number[][] = []
let activePiece: Piece


function getGridEment(): HTMLDivElement | null{
  const grid = document.getElementById('grid')
  return grid instanceof HTMLDivElement ?  grid : null
}


export function addPiece(){
  let randomNumber = Math.floor(Math.random() * 7)
  let newPiece: Piece| null = null
  console.log("number: " + randomNumber)
  switch(randomNumber){
    case 0: newPiece = new Line(columnNumber,rowNumber); break;
    case 1: newPiece = new LBlock(columnNumber,rowNumber); break;
    case 2: newPiece = new ReverseLBlock(columnNumber,rowNumber); break;
    case 3: newPiece = new TBlock(columnNumber,rowNumber); break;
    case 4: newPiece = new SquigellingRight(columnNumber,rowNumber); break;
    case 5: newPiece = new Square(columnNumber,rowNumber); break;
    case 6: newPiece = new SquigellingLeft(columnNumber,rowNumber); break;
    default: throw new Error("Unkhown piece")
  }
  if(newPiece) activePiece = newPiece
}

function updateGridPieces(piece: Piece){
  let pieceArray = piece.getPieceArray()
  let pieceCoord = piece.pieceCoord
  let count = 0
  let realIndex = 0
  for(let i = 0; i < rowNumber; i++){
    for(let j = 0; j < columnNumber; j++){
      gridForPiece[i][j] = 0
    }
  }
  pieceArray.forEach((element, index) => {
    if(count >= 4){
      count = 0
      realIndex++
    }
    if(element == 1){
      gridForPiece[ pieceCoord.y + realIndex][pieceCoord.x + count] = 1
    }
    count++
  })
  
}
function pieceBasicAction(){
  activePiece.pieceCoord.y = activePiece.pieceCoord.y + 1
}
export function pieceMoveLeft(){
  activePiece.moveLeft()
  updateGridPieces(activePiece)
  draw()
}
export function pieceMoveRight(){
  activePiece.moveRight()
  updateGridPieces(activePiece)
  draw()
}
export function pieceRotateLeft(){
  activePiece.turnLeft()
  updateGridPieces(activePiece)
  draw()
}
export function pieceRotateRight(){
  activePiece.turnRight()
  updateGridPieces(activePiece)
  draw()
}

function logGrid(){
  gridForPiece.forEach((e)=>{
    e.forEach((z) => {
      console.log(z)
    })
  })
}

function move(){
  updateGridPieces(activePiece)
  pieceBasicAction()
  draw()
}

function draw(){
  let gridElement = getGridEment()
  if(gridElement){
    // drawArray
    let collection = gridElement.children
    for(let i = 0 ; i < collection.length; i++){
      let child = collection[i].children
      for(let j = 0 ; j < child.length ; j++){
        child[j].classList.remove('tetris_active')
        if(grid[i][j] == 1) child[j].classList.add('tetris_active')
        if(gridForPiece[i][j] == 1) {
          child[j].classList.add('tetris_active')
        }
      }
    }

    // draw piece


  }else{
    throw new Error('grid element is missing')
  }
}



function animate(){
  timer++
  if(timer > timerReset){
    timer = 0
    console.log("animate")
    console.log("active piece x coord " + activePiece.pieceCoord.x)
    move()
  }
  window.requestAnimationFrame(animate)
}

export function initGrid(){
  // grid array
  for(let i = 0; i < rowNumber; i++){
    let row = []
    let rowForPice = []
    for(let j = 0; j < columnNumber; j++){
      row.push(0)
      rowForPice.push(0)
    }
    grid.push(row)
    gridForPiece.push(rowForPice)
  }
  // grid element
  const gridElement = getGridEment()
  if(!gridElement) throw new Error('Grid Element is null')
    gridElement.innerHTML = ''
  for(let i = rowNumber - 1; i > 0; i--){
    let gridChild1 = document.createElement('DIV')
    gridChild1.dataset['row'] = i.toString()
    for(let j = 0; j < columnNumber; j++){
      let newGridChild = document.createElement('DIV')
      newGridChild.classList.add('tetris_square')
      gridChild1.append(newGridChild)
    }
    gridElement.appendChild(gridChild1)
  }
}
export function startGame(){
  animate()
}
