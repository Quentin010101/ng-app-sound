import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AuthenticationService } from '../../service/security/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _authenticationService = inject(AuthenticationService)
  public hover:boolean = false
  public username: string = ''

  constructor(){
     if(this._authenticationService.getUsername) this.username = this._authenticationService.getUsername
  }

  public logOut(){
    this._authenticationService.logout()
  }

  public onMouseEnter(){
    this.hover = true
  }

  public onMouseLeave(){
    this.hover = false
  }
}
