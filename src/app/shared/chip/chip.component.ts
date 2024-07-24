import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() text: string | null = null
  @Input() action: boolean = false
  @Output() chipEmiter = new EventEmitter<boolean>()


}
