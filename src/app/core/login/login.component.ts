import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { TextComponent } from '../../shared/input/text/text.component';
import { PasswordComponent } from '../../shared/input/password/password.component';
import { ButtonComponent } from '../../shared/input/button/button.component';
import { ThemeComponent } from '../../shared/theme/theme.component';
import { AuthenticationService } from '../../service/security/authentication.service';
import { RequestAuthentication } from '../../interface/security/requestAuthentication.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../service/utils/message.service';
import { Message } from '../../interface/utils/message.interface';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextComponent, PasswordComponent, ButtonComponent, ThemeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private _authenticationService = inject(AuthenticationService)
  private _messageService = inject(MessageService)
  public $subject = new Subject<string>()

  public loginFormulaire = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(){
    this.$subject.subscribe((text) => {
      this.handleMessage(text)
    })
  }

  public onFormSubmit(){
    if(!this.loginFormulaire.invalid){
      this.requestAccess()
    }
  }

  private requestAccess(){
    this._authenticationService.requestAuthentication(this.buildRequest(), this.$subject)
  }

  private buildRequest(): RequestAuthentication{
    let requestAuthentication = new RequestAuthentication()
    requestAuthentication.username = this.loginFormulaire.controls.username.value as string
    requestAuthentication.password = this.loginFormulaire.controls.password.value as string

    return requestAuthentication
  }

  public handleMessage(text: string){
    if(text){
      let message = new Message(text)
      message.error = true
      this._messageService.$messageSubject.next(message)
    }
    this.clearFormulaire()
  }

  private clearFormulaire(){
    this.loginFormulaire.reset()
  }
}
