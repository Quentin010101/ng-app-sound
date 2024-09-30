import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { BackComponent } from '../../../../shared/back/back.component';
import { ActivatedRoute, Router } from '@angular/router';
import initGrid, { startAnimation, setDirection, stopAnimation, reset, setPause, restart, setVariable, $loose } from './snake';
import { Direction } from '../enum';
import { SnakeFormulaireComponent } from './snake-formulaire/snake-formulaire.component';
import { IconComponent } from '../../../../shared/icon/icon.component';

const DEFAULT_SPEED = 7
const DEFAULT_SIZE = 15
const DEFAULT_INCREMENTATION = 3

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [BackComponent, SnakeFormulaireComponent, IconComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss'
})
export class SnakeComponent {
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  @ViewChild('grid') grid!: ElementRef
  action: boolean = false
  isPaused: boolean = false
  mouseOverGrid: boolean = false
  snakeVariable: SnakeVariable = new SnakeVariable()
  loose: boolean = false

  goBack(){
    this.router.navigate(['home'], { relativeTo: this.activeRoute.parent });
  }

  ngAfterViewInit(){
    setVariable(this.snakeVariable.grid,this.snakeVariable.speed,this.snakeVariable.incrementation)
    initGrid(this.grid.nativeElement)
    window.addEventListener('blur', () => {
      if(this.action && !this.loose){
        this.isPaused = true
        setPause()
      }
    })
    $loose.subscribe(value => {
      this.loose = value
    })
  }

  start(){
    this.action = true
    setVariable(this.snakeVariable.grid,this.snakeVariable.speed,this.snakeVariable.incrementation)
    startAnimation()
  }
  stop(){
    this.action = false
    stopAnimation()
    reset()
  }
  pau(){
    this.isPaused = true
    setPause()
  }
  re(){
    this.isPaused = false
    restart()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault() 
    if(event.key === "ArrowRight") setDirection(Direction.RIGHT)
    if(event.key === "ArrowLeft") setDirection(Direction.LEFT)
    if(event.key === "ArrowUp") setDirection(Direction.UP)
    if(event.key === "ArrowDown") setDirection(Direction.DOWN)
  }

  @HostListener('window:resize')
  onResize(){
    let width = window.innerWidth
    let height = window.innerHeight
    if(width >= height){
      
    }
  }

  ngOnDestroy(){
    reset()
  }

  onFormSubmit(snakeV: SnakeVariable){
    this.snakeVariable = snakeV
    setVariable(snakeV.grid, snakeV.speed, snakeV.incrementation)
    initGrid(this.grid.nativeElement)
  }

  setMouseOver(){
    this.mouseOverGrid = true
  }
  setMouseLeave(){
    this.mouseOverGrid = false
  }

}

export class SnakeVariable{
  grid: number = DEFAULT_SIZE
  speed: number = DEFAULT_SPEED
  incrementation: number = DEFAULT_INCREMENTATION
}

