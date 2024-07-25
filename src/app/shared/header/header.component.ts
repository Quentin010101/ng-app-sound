import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AuthenticationService } from '../../service/security/authentication.service';
import { ThemeComponent } from '../theme/theme.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, IconComponent, ThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _authenticationService = inject(AuthenticationService)
  public username: string = ''

  constructor(){
     if(this._authenticationService.getUsername) this.username = this._authenticationService.getUsername
  }

  public logOut(){
    this._authenticationService.logout()
  }


}
