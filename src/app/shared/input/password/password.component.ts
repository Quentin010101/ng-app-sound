import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'input-password',
  standalone: true,
  imports: [ReactiveFormsModule, IconComponent],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
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
