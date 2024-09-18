import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, IconComponent],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {
  @Input() control = new FormControl()
  @Input() label: string | null = null
  @Input() placeholder: string = ''
  @Input() icon: string = ''
  @Input() width: string | null = null
  @Input() min: number | null = null
  @Input() max: number | null = null
  @Input() step: number | null = null
  
  public focus: boolean = false

  onFocus(){
    this.focus = true
  }

  onBlur(){
    this.focus = false
  }
}
