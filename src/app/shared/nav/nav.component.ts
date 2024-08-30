import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../service/security/authentication.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, IconComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
 private _authenticationService = inject(AuthenticationService)
  public isAdmin: boolean = false

  constructor(){
    this.isAdmin = this._authenticationService.getIsAdmin
    this.isAdmin = true
  }

}
