import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  $themeSubject = new BehaviorSubject<string | null>(null)


  constructor() {
    let storageTheme = this.getLocalStorageInfo()
    if(storageTheme && this.storageThemeValid(storageTheme)){
      if(storageTheme == 'light') this.setLightTheme()
      if(storageTheme == 'dark') this.setDarkTheme()
    }else{
      this.setLightTheme()
    }
  }

  setLightTheme(){
    this.setLocalStorageInfo('light')
    this.$themeSubject.next('light')
    document.body.dataset['theme'] = "default"
  }

  setDarkTheme(){
    this.setLocalStorageInfo('dark')
    this.$themeSubject.next('dark')
    document.body.dataset['theme'] = "dark"
  }

  private getLocalStorageInfo(): string | null{
    let theme = localStorage.getItem("theme")
    return theme
  }

  private storageThemeValid(theme: string): boolean{
    if( theme == 'light' || theme == 'dark'){
      return true
    }
    return false
  }

  private setLocalStorageInfo(theme: string){
    localStorage.setItem('theme', theme)
  }


}
