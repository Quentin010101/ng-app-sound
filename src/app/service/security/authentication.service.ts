import { Injectable, inject, signal } from '@angular/core';
import { LoginService } from './login.service';
import { RequestAuthentication } from '../../interface/security/requestAuthentication.interface';
import { ResponseAuthentication } from '../../interface/security/responseAuthentication.interface';
import { Role } from '../../interface/security/role.interface';
import { Tools } from '../../utils/tools';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _loginService = inject(LoginService)

  // Signal
  private userIsAuthenticated = false
  private userHasToken = false
  private userToken: string | null = null
  private username: string | null = null
  private roles: Role[] = []


  constructor() { }

  public init(){
    if(this.userIsAuthenticated) throw new Error("user shouldn t be auth yet")
    
    let userInStorage: ResponseAuthentication | null = this.getResponseAuthenticationFromLocalStorage()
    if(userInStorage){
      this.handleAuthenticationResponseValid(userInStorage)
    }
  }

  public requestAuthentication(requestAuthentication: RequestAuthentication){
    this._loginService.loginRequest(requestAuthentication).subscribe((responseAuthentication) => {
      if(this._loginService.validateResponseAuthentication(responseAuthentication)){

        this.handleAuthenticationResponseValid(responseAuthentication)
        this.storeResponseAuthenticationToLocalStorage(responseAuthentication)
      }else{

        this.handleAuthenticationResponseInvalid()
      }
    })
  }

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
