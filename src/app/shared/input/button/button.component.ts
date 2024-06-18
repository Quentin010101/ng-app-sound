import { Component, Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'input-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() icon: string = '';

}
