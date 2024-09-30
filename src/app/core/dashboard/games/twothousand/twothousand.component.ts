import { Component, HostListener, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackComponent } from '../../../../shared/back/back.component';
import { initGrid, start, action, reset } from './twothousand';
import { Direction } from '../enum';

@Component({
  selector: 'app-twothousand',
  standalone: true,
  imports: [BackComponent],
  templateUrl: './twothousand.component.html',
  styleUrl: './twothousand.component.scss'
})
export class TwothousandComponent {
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  
  goBack(){
    this.router.navigate(['home'], { relativeTo: this.activeRoute.parent });
  }

  ngOnInit(){
    initGrid()
    start()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault() 
    if(event.key === "ArrowRight") action(Direction.RIGHT)
    if(event.key === "ArrowLeft") action(Direction.LEFT)
    if(event.key === "ArrowUp") action(Direction.UP)
    if(event.key === "ArrowDown") action(Direction.DOWN)
  }

  ngOnDestroy(){
    reset()
  }
}


