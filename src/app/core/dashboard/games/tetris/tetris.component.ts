import { Component, HostListener } from '@angular/core';
import  {init, moveDown, moveLeft, moveRight, rotateLeft, rotateRight, sstart, sstop}  from './tetris';

@Component({
  selector: 'app-tetris',
  standalone: true,
  imports: [],
  templateUrl: './tetris.component.html',
  styleUrl: './tetris.component.scss'
})
export class TetrisComponent {
  ngOnInit(){
    init()
    this.startGame()
  }

  startGame(){
    sstart()
  }

  stopGame(){
    sstop()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault()
    console.log(event.key)
    switch(event.key){
      case 'ArrowLeft' : moveLeft(); break;
      case 'ArrowRight' : moveRight(); break;
      case 'ArrowDown' : moveDown(); break;
      case 'a' : rotateLeft(); break;
      case 'e' : rotateRight(); break;
    }
  }
}
