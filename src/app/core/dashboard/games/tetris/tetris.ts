import { chooseNewPiece, clearGrid, initmodule } from "./tetrisInit"
import { ActionTetris, Piece } from "./tetrisPieceClass"

export let globalGrid: number[][] = []
export let pieceGrid: number[][] = []

export const NUMBER_OF_COLUMNS = 10
export const NUMBER_OF_ROWS = 24
const SPEED = 80

let animationFrame: number
let activePiece: Piece | null
let addNewPieceNextCycle = false


export function init(){
  initmodule(globalGrid,pieceGrid)
}

function synchronizePieceToGrid(){
  let piece = activePiece
  if(piece){
    pieceGrid = clearGrid(pieceGrid)
    let coords = piece.getPieceCoordinate()
    coords.forEach(value => {
      pieceGrid[value[1]][value[0]] = 1
    })
  }else{
    pieceGrid = clearGrid(pieceGrid)
  }
}

function addNewPiece(){
  let piece = chooseNewPiece()
  if(piece){ activePiece = piece }
}

// Draw
function drawGrid(){
  console.log("----- draw -----")
  let gridDiv = getGrid()
  if(gridDiv){
    gridDiv.innerHTML = ''
    for(let i = 0; i < globalGrid.length; i++){
      const rowDiv = document.createElement('DIV')
      rowDiv.dataset['row'] = (NUMBER_OF_ROWS - i).toString()
      globalGrid[i].forEach((squareValue, index2) => {
        const square = document.createElement('DIV')
        square.classList.add('tetris_square')
        if(pieceGrid[i][index2] == 1 || squareValue == 1){
          square.classList.add('tetris_active')
        }
        rowDiv.append(square)
      })
      gridDiv.append(rowDiv)
    }
  }else{
    throw Error('Element grid not yet initialized.')
  }
}

export function sstart(){
  addNewPiece()
  _action()
  animate()
}
export function sstop(){
  window.cancelAnimationFrame(animationFrame)
}

function _action(){
  synchronizePieceToGrid()
  drawGrid()
}

function basicAction(){
  if(addNewPieceNextCycle){
    addNewPieceNextCycle = false
    addNewPiece()
    _action()
  }else{
    if(!activePiece) throw Error("-- Active piece doesn't exist!")
    moveDown()
  }
}

function deleteFullLine(arr: number[]){
  for(let i = arr.length - 1; i >= 0; i--){
    globalGrid.splice(arr[i],1)
    let temp = Array(NUMBER_OF_COLUMNS)
    temp.fill(0)
    globalGrid.unshift(temp)
  }
}

function checkIfLineIsFull(): number[]{
  let rowToSupress: number[] = []
  globalGrid.forEach((row, index) => {
    if(row.indexOf(0) === -1) rowToSupress.push(index)
  })
  return rowToSupress
}

// Animate
let animateValue = 0
function animate(){
  if(cycle()){
    basicAction()
  }
  animationFrame = window.requestAnimationFrame(animate)
}

function cycle(): boolean{
  if(animateValue > SPEED){
    animateValue = 0
    return true
  }
  animateValue++
  return false
}

function getGrid(): HTMLElement | null{
  return document.getElementById('grid')
}

function addToGlobalGrid(piece: Piece){
  let coords = piece.getPieceCoordinate()
  coords.forEach(value => {
    if(globalGrid[value[1]][value[0]] == 1) throw Error("Game Over")
    globalGrid[value[1]][value[0]] = 1
  })
  activePiece = null
}

function pieceReachTheEnd(piece: Piece){
  addToGlobalGrid(piece)
  let rowToSupress = checkIfLineIsFull()
  if(rowToSupress.length > 0){
    deleteFullLine(rowToSupress)
    addNewPieceNextCycle = true
  }else{
    addNewPiece()
  }
  _action()
}

function move(action: ActionTetris){
  if(!activePiece) throw Error("activepiece not initialized")
  if(testMove(action, activePiece)){
    activePiece.move(action)
    _action()
  }else if(action == ActionTetris.MOVE_DOWN){
    pieceReachTheEnd(activePiece)
  }else{
    console.warn("cant move this way.")
  }
}

function testMove(action: ActionTetris, piece: Piece):boolean{
  let clone = piece.getClone()
  clone.move(action)
  return isValide(clone)
}
function isValide(clone: Piece): boolean{
  let response = true
  let cloneCoords = clone.getPieceCoordinate()
  cloneCoords.forEach(value => {
    // depasse taille de la grid
    if((value[0] > globalGrid[0].length - 1 || value[0] < 0) || (value[1] > globalGrid.length - 1)){
      response = false
    }else{
      // existe déjà dans global grid
      if(globalGrid[value[1]][value[0]] == 1){
        response = false
      }
    }
  })
  return response
}

//Move
export function moveDown(){
  move(ActionTetris.MOVE_DOWN)
}
export function moveLeft(){
  move(ActionTetris.MOVE_LEFT)
}
export function moveRight(){
  move(ActionTetris.MOVE_RIGHT)

}
export function rotateLeft(){
  move(ActionTetris.ROTATE_LEFT)

}
export function rotateRight(){
  move(ActionTetris.ROTATE_RIGHT)

}