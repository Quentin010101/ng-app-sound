import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, IconComponent],
  templateUrl: './text.component.html',
  styleUrl: './text.component.scss'
})
export class TextComponent {
  @Input() control = new FormControl()
  @Input() label: string | null = null
  @Input() placeholder: string = ''
  @Input() icon: string = ''

  public focus: boolean = false

  onFocus(){
    this.focus = true
  }

  onBlur(){
    this.focus = false
  }
}
