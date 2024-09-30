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
    if(this.pieceCoord.x> 0  - this.findNextBlock(DIRECTION.LEFT,this.state)) this.pieceCoord.x--
  }
  moveRight(){
    if(this.pieceCoord.x + 4 - this.findNextBlock(DIRECTION.RIGHT,this.state) + 2 <= this.columnNumber + 1) this.pieceCoord.x++
  }
  private findNextBlock(direction: DIRECTION, state: State){
    let actualPiece = this.piece[state].map(x => x)
    let arrToCheck = []
    for(let i = 0; i < 4; i++){
       arrToCheck.push(actualPiece.splice(0,4));
    } 
    let check = false
    if(direction === DIRECTION.RIGHT) {
      for(let i = 0; i < 4; i++){
        arrToCheck[i] = this.reverseArray(arrToCheck[i])
      }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
          if(arrToCheck[j][i] == 1){
            check = true
            break;
          }
        }
        if(check) return i
      }
    return -1
  }
  private canRotate(nextSate: State){
    let bool = false
    let left = this.findNextBlock(DIRECTION.LEFT,nextSate)
    let right = this.findNextBlock(DIRECTION.RIGHT,nextSate)
    console.log("space in piece square:  left: " + left + " right: " + right)
    console.log("piece coord x: " + this.pieceCoord.x)
    console.log("index of last piece square to the right: " + (this.pieceCoord.x + 4 - right))
    if(this.pieceCoord.x>= 0  - left  && (this.pieceCoord.x + 4 - right <= this.columnNumber)){
      bool = true
    }
    return bool
  }
  turnLeft(){
    let tempState: State
    if(this.state === State.UP){
      tempState = State.LEFT
    }else{
      tempState = this.state - 1
    }
    if(this.canRotate(tempState)){
      this.state = tempState
    }
  }
  turnRight(){
    let tempState: State
    if(this.state === State.LEFT){
      tempState = State.UP
    }else{
      tempState = this.state + 1
    }
    if(this.canRotate(tempState)){
      this.state = tempState
    }
  }
  getPieceArray(){
    return this.piece[this.state]
  }
  private reverseArray(arr: number[]){
    let tempArr: number[] = []
    arr.forEach((v) => {
      tempArr.unshift(v)
    })
    return tempArr
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