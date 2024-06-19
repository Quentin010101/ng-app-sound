import { Injectable, inject } from '@angular/core';
import { LoginService } from './login.service';
import { RequestAuthentication } from '../../interface/security/requestAuthentication.interface';
import { ResponseAuthentication } from '../../interface/security/responseAuthentication.interface';
import { Role } from '../../interface/security/role.interface';
import { Tools } from '../../utils/tools';
import { Router } from '@angular/router';
import { LoginComponent } from '../../core/login/login.component';
import { Subject } from 'rxjs';
import { MessageService } from '../utils/message.service';
import { Message } from '../../interface/utils/message.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loginService = inject(LoginService)
  private _messageService = inject(MessageService)
  private router = inject(Router);

  // User state ----
  private userIsAuthenticated = false
  private userHasToken = false
  private userToken: string | null = null
  private username: string | null = null
  private roles: Role[] = []


  constructor() { }

  // Public ----
  public init(){
    if(this.userIsAuthenticated) throw new Error("user shouldn t be auth yet")
    
    let userInStorage: ResponseAuthentication | null = this.getResponseAuthenticationFromLocalStorage()
    if(userInStorage){
      this.handleAuthenticationResponseValid(userInStorage)
    }
  }

  public requestAuthentication(requestAuthentication: RequestAuthentication, subject: Subject<string>){
    this._loginService.loginRequest(requestAuthentication).subscribe({
      next: (responseAuthentication) => {
        if(this._loginService.validateResponseAuthentication(responseAuthentication)){
          this.handleAuthenticationResponseValid(responseAuthentication)
          this.storeResponseAuthenticationToLocalStorage(responseAuthentication)
          this._messageService.$messageSubject.next(new Message("Welcome "+ responseAuthentication.username  +", to your account." ))
          this.router.navigate([''])
        }else{
          this.logout()
          subject.next("Somethin went wrong try again.")
        }
      },
      error: (error) => {
        this.logout()
        subject.next("Wrong credential.")
      }
    })
  }

  public logout(){
    this.clearLocalStorage()
    this.resetAuthentication()
    this.router.navigate(['/login'])
  }



  // Private ----
  private handleAuthenticationResponseValid(responseAuthentication: ResponseAuthentication){
    this.userIsAuthenticated = true
    this.userHasToken = true
    this.userToken = responseAuthentication.jwtToken
    this.username = responseAuthentication.username
    this.roles = responseAuthentication.roles
  }

  private storeResponseAuthenticationToLocalStorage(responseAuthentication: ResponseAuthentication){
    localStorage.setItem("userToken", responseAuthentication.jwtToken)
    localStorage.setItem("username", responseAuthentication.username)
    localStorage.setItem("roles", JSON.stringify(responseAuthentication.roles))
  }

  private clearLocalStorage(){
    localStorage.clear()
  }

  private resetAuthentication(){
    this.userIsAuthenticated = false
    this.userHasToken = false
    this.userToken = null
    this.username = null
    this.roles = []
  }

  private getResponseAuthenticationFromLocalStorage(): ResponseAuthentication | null{
    let jwtToken = localStorage.getItem("userToken")
    let username = localStorage.getItem("username")
    let roles = localStorage.getItem("roles")

    if(!Tools.isBlank(jwtToken) && !Tools.isBlank(username) && this.checkRoleValid(roles)){
        let user = new ResponseAuthentication()
        user.jwtToken = jwtToken as string
        user.username = username as string
        user.roles = JSON.parse(roles as string)

        return user
    }
    return null;
  }

  private checkRoleValid(rolesString: string | null):boolean{
    if(rolesString){
      let rolesParsed = JSON.parse(rolesString)
      if(rolesParsed instanceof Array){
        let checkRoleInvalid = rolesParsed.find(role => !Object.values(Role).includes(role))
        if(checkRoleInvalid.length == 0) return true;
      }
    }
    return false;
  }

  private handleAuthenticationResponseInvalid(){
  }











  // Getter
  get getUserIsAuthenticated(){
    return this.userIsAuthenticated
  }
  get getUserHasToken(){
    return this.userHasToken
  }
  get getToken(){
    return this.userToken
  }
  get getUsername(){
    return this.username
  }
  get getRoles(){
    return this.roles
  }

}
