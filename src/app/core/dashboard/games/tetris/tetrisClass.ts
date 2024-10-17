export class Piece{
  pieceCoord!: PieceCoord
  state!: State
  piece: number[][] = []
  columnNumber!: number
  rowNumber!: number
  constructor(piece: number[][], columnNumber:number, rowNumber: number){
    this.piece=piece
    this.state = State.UP
    this.pieceCoord = new PieceCoord(columnNumber, rowNumber)
    this.columnNumber = columnNumber
    this.rowNumber = rowNumber
  }
  moveLeft(){
    this.pieceCoord.x--
  }
  moveRight(){
    this.pieceCoord.x++
  }

  turnLeft(){
    if(this.state === State.UP){
      this.state = State.LEFT
    }else{
      this.state = this.state - 1
    }

  }
  turnRight(){
    if(this.state === State.LEFT){
      this.state = State.UP
    }else{
      this.state = this.state + 1
    }
  }
  getPieceArray(){
    return this.piece[this.state]
  }
}
export class PieceCoord{
  constructor(columnNumber:number, rowNumber: number){
    this.x = columnNumber/2 - 2
    this.y = 0
  }
  y: number
  x: number
}
export class Line extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class SquigellingLeft extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0],[0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class Square extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class SquigellingRight extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],[0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class TBlock extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,1,0,0,0,1,1,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0],[0,0,0,1,0,0,1,1,0,0,0,1,0,0,0,0],[0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class ReverseLBlock extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0],[0,1,1,0,0,1,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0]],columnNumber,rowNumber)
  }
}
export class LBlock extends Piece{
  constructor(columnNumber:number, rowNumber: number){
    super([[0,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0],[0,1,1,0,0,0,1,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,1,1,1,0,1,0,0,0,0,0,0]],columnNumber,rowNumber)
  }
}
enum State{
  UP = 0,RIGHT =1,DOWN = 2,LEFT = 3
}
enum DIRECTION{
  RIGHT,DOWN,LEFT
}