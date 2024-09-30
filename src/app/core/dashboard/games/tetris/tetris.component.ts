import { Component, HostListener } from '@angular/core';
import { addPiece, initGrid, startGame, pieceMoveLeft, pieceMoveRight, pieceRotateLeft, pieceRotateRight } from './tetris';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss'
})
export class TetrisComponent {
  ngOnInit(){
    initGrid()
    addPiece()
    startGame()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault() 
    if(event.key === "a") pieceRotateLeft()
    if(event.key === "e") pieceRotateRight()
    if(event.key === "ArrowRight") pieceMoveRight()
    if(event.key === "ArrowLeft") pieceMoveLeft()
    if(event.key === "ArrowDown") ''
  }
}
