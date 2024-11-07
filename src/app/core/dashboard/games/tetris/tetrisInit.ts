import { NUMBER_OF_COLUMNS, NUMBER_OF_ROWS } from "./tetris"
import { LBlock, Line, Piece, ReverseLBlock, Square, SquigellingLeft, SquigellingRight, TBlock } from "./tetrisPieceClass"

// Initialization
export function initmodule(globalGrid: number[][], pieceGrid: number[][]){
  for(let i = 0; i < NUMBER_OF_ROWS; i++){
   let temp = []
   for(let j = 0; j < NUMBER_OF_COLUMNS; j++){
     temp.push(0)
   }
   globalGrid.push(temp)
   pieceGrid.push(temp)
  }
 }
 export function clearGrid(pieceGrid: number[][]):number[][]{
  pieceGrid = []
  for(let i = 0; i < NUMBER_OF_ROWS; i++){
    let temp = []
    for(let j = 0; j < NUMBER_OF_COLUMNS; j++){
      temp.push(0)
    }
    pieceGrid.push(temp)
  }
  return pieceGrid
}
export function chooseNewPiece(): Piece | null{
  let newPiece = null;
  let number = Math.floor(Math.random()*7)
  switch(number){
    case 0 : newPiece = new Line(); break;
    case 1 : newPiece = new SquigellingLeft(); break;
    case 2 : newPiece = new Square(); break;
    case 3 : newPiece = new SquigellingRight(); break;
    case 4 : newPiece = new TBlock(); break;
    case 5 : newPiece = new ReverseLBlock(); break;
    case 6 : newPiece = new LBlock(); break;
  }
  return newPiece;
}