import { Component } from '@angular/core';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {

  onClick(e: Event){
    if(e.target instanceof HTMLInputElement){
      let value: boolean = e.target.checked
      if(value){
        document.body.dataset['theme'] = "dark"
      }else{
        document.body.dataset['theme'] = "default"
      }
    }
  }
}
