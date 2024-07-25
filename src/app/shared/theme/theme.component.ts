import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../service/utils/theme.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.scss'
})
export class ThemeComponent {
  private _themeService = inject(ThemeService)

  light: boolean = true

  constructor(){
    this._themeService.$themeSubject.subscribe(theme => {
      if(theme && theme == 'light'){
        this.light = true
      }else{
        this.light = false
      }
    })
  }

  onClick(){
    if(this.light){
      this._themeService.setDarkTheme()
    }else{
      this._themeService.setLightTheme()
    }
  }
}
