import { LBlock, Line, Piece, ReverseLBlock, Square, SquigellingLeft, SquigellingRight, TBlock } from "./tetrisClass"


let pieceSize = 4 // Size of the piece container
let columnNumber = 10
let rowNumber = 3 + pieceSize
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
  for(let i = 0; i < pieceArray.length; i++){
    if(count >= 4){
      count = 0
      realIndex++
    }
    if(pieceArray[i] === 1){
      // if(pieceCoord.y + realIndex > rowNumber - 1) return false
      // if(pieceCoord.x + count > columnNumber - 1) return false
      gridForPiece[ pieceCoord.y + realIndex][pieceCoord.x + count] = 1
    }
  }

  return true
}
function pieceBasicAction(){
  activePiece.pieceCoord.y = activePiece.pieceCoord.y + 1
}
export function pieceMoveLeft(){
  activePiece.moveLeft()
  if(updateGridPieces(activePiece)){
    draw()
  }else{
    activePiece.moveRight()
  }
}
export function pieceMoveRight(){
  activePiece.moveRight()
  if(updateGridPieces(activePiece)){
    draw()
  }else{
    activePiece.moveLeft()
  }
}
export function pieceRotateLeft(){
  activePiece.turnLeft()
  if(updateGridPieces(activePiece)){
    draw()
  }else{
    activePiece.turnRight()
  } 
}
export function pieceRotateRight(){
  activePiece.turnRight()
  if(updateGridPieces(activePiece)){
    draw()
  }else{
    activePiece.turnLeft()
  }
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
function saveActivePiece(){
  gridForPiece.forEach((value, firstIndex) => {
    value.forEach((value2, index2) => {
      if(value2 === 1) grid[firstIndex][index2] = 1
    })
  })
}
// a adapter
function checkIfActivePieceNextMoveIsPossible(): boolean{
  let y = activePiece.pieceCoord.y
  console.log("y: " + y)
  // case piece leave grid
  try{
    updateGridPieces(activePiece)
  }catch{
    activePiece.pieceCoord.y = y-1
    return false
  }
  if(gridForPiece.length !== grid.length){
    throw new Error("both grid array are not the same length")
  }
  let returnValue = true
  grid.forEach((gridValue, firstIndex) => {
    gridValue.forEach((childGridValue, secondIndex) => {
      // case piece touch grid
      if(childGridValue === 1 && childGridValue == gridForPiece[firstIndex][secondIndex]){
        returnValue = false
      } 

    })
  })
  return returnValue
}

function reverseArray(arr: any[]){
  let tempArr: any[] = []
  arr.forEach((v) => {
    tempArr.unshift(v)
  })
  return tempArr
}
// a adapter
function checkVerticalSquare(bool: boolean){
  let piece = activePiece.getPieceArray()
  let arrToCheck = []
  for(let i = 0; i < 4; i++){
     arrToCheck.push(piece.splice(0,4));
  }
  if(bool) arrToCheck = reverseArray(arrToCheck)
  for(let i = 0; i < arrToCheck.length; i++){
    if(arrToCheck[i].indexOf(1) === -1){
      return i
    }
  }
  return -1
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
  for(let i = 0; i < rowNumber; i++){
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
