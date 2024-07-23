import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-textarea',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
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
