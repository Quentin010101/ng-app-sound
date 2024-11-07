import { NUMBER_OF_COLUMNS } from "./tetris"

export class Piece{
  protected piece: number[][][] = []
  private pieceCoord!: PieceCoord
  private state: State = State.UP

  constructor(){
    this.pieceCoord = new PieceCoord()
  }
  move(action: ActionTetris){
    switch(action){
      case ActionTetris.MOVE_DOWN : this.moveDown(); break;
      case ActionTetris.MOVE_LEFT : this.moveLeft(); break;
      case ActionTetris.MOVE_RIGHT : this.moveRight(); break;
      case ActionTetris.ROTATE_LEFT : this.turnLeft(); break;
      case ActionTetris.ROTATE_RIGHT : this.turnRight(); break;
    }
  }
  private moveLeft(){
    this.pieceCoord.x--
  }
  private moveRight(){
    this.pieceCoord.x++
  }
  private moveDown(){
    this.pieceCoord.y++
  }
  private turnLeft(){
    if(this.state === State.UP){
      this.state = State.LEFT
    }else{
      this.state = this.state - 1
    }

  }
  private turnRight(){
    if(this.state === State.LEFT){
      this.state = State.UP
    }else{
      this.state = this.state + 1
    }
  }
  private getPieceArray(): number[][]{
    return this.piece[this.state]
  }
  set(piece: number[][][],pieceCoord: PieceCoord,state: State){
    this.piece = piece
    let pi = new PieceCoord()
    pi.x = pieceCoord.x
    pi.y = pieceCoord.y
    this.pieceCoord = pi
    this.state=state
  }
  getClone(){
    let p = new Piece()
    p.set(this.piece,this.pieceCoord,this.state)
    return p
  }
  getPieceCoordinate(): number[][]{
    let pieceArray = this.getPieceArray()
    let pieceItemCoord: number[][] = []
    for(let i = 0 ; i < pieceArray.length; i++){
      for(let j = 0 ; j < pieceArray[i].length; j++){
        if(pieceArray[i][j] === 1){
          pieceItemCoord.push([j + this.pieceCoord.x,i + this.pieceCoord.y])
        }
      }
    }
    return pieceItemCoord
  }
  

}
export enum ActionTetris{
  MOVE_LEFT, MOVE_RIGHT, MOVE_DOWN, ROTATE_LEFT, ROTATE_RIGHT
}
export class PieceCoord{
  constructor(){
    this.x = NUMBER_OF_COLUMNS/2 - 2
    this.y = 0
  }
  y: number
  x: number
}
export class Line extends Piece{
  override piece = [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],[[1,1,1,1],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]
}
export class SquigellingLeft extends Piece{
    override piece = [[[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,0,0,0],[0,0,1,1],[0,1,1,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,0,0,0],[0,0,1,1],[0,1,1,0],[0,0,0,0]]]
}
export class Square extends Piece{
    override piece = [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]
}
export class SquigellingRight extends Piece{
    override piece = [[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]],[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]]]
}
export class TBlock extends Piece{
    override piece = [[[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[0,0,1,0],[0,1,1,1],[0,0,0,0]],[[0,0,0,1],[0,0,1,1],[0,0,0,1],[0,0,0,0]],[[0,1,1,1],[0,0,1,0],[0,0,0,0],[0,0,0,0]]]
}
export class ReverseLBlock extends Piece{
    override piece = [[[0,0,1,0],[0,0,1,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,1],[0,0,0,1],[0,0,0,0]],[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[0,1,0,0],[0,1,1,1],[0,0,0,0]]]
}
export class LBlock extends Piece{
    override piece = [[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[0,0,0,1],[0,1,1,1],[0,0,0,0]],[[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,1],[0,1,0,0],[0,0,0,0]]]
}
enum State{
  UP = 0,RIGHT =1,DOWN = 2,LEFT = 3
}
