import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-back',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './back.component.html',
  styleUrl: './back.component.scss'
})
export class BackComponent {
  @Input() text:string = 'Go Back'
  @Output() goBackEmitter = new EventEmitter<boolean>()

  emit(){
    this.goBackEmitter.emit(true)
  }
}
