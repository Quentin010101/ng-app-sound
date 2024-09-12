import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { BackComponent } from '../../../../shared/back/back.component';
import { ActivatedRoute, Router } from '@angular/router';
import initGrid, { startAnimation, setDirection, stopAnimation, reset } from './snake';
import { Direction } from './enum';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [BackComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  @ViewChild('grid') grid!: ElementRef
  action: boolean = false
  gridSize: number = 15

  goBack(){
    this.router.navigate(['home'], { relativeTo: this.activeRoute.parent });
  }

  ngAfterViewInit(){
    initGrid(this.gridSize, this.grid.nativeElement)
  }

  start(){
    this.action = true
    startAnimation()
  }
  stop(){
    this.action = false
    stopAnimation()
    reset()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key === "ArrowRight") setDirection(Direction.RIGHT)
    if(event.key === "ArrowLeft") setDirection(Direction.LEFT)
    if(event.key === "ArrowUp") setDirection(Direction.UP)
    if(event.key === "ArrowDown") setDirection(Direction.DOWN)
  }


}
