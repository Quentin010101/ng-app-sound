import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() size: string = 'md'

  sm:boolean =false
  md:boolean =false
  lg:boolean =false

  ngOnInit(){
    if(this.size == 'sm') this.sm = true
    if(this.size == 'md') this.md = true
    if(this.size == 'lg') this.lg = true
  }
}
