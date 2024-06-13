import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RequestAuthentication } from '../../interface/security/requestAuthentication.interface';
import { Observable } from 'rxjs';
import { ResponseAuthentication } from '../../interface/security/responseAuthentication.interface';
import { environnement } from '../../../environnement';
import { Tools } from '../../utils/tools';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient)

  private url = environnement.backend_url
  private requestMapping = 'authentication/'
  
  constructor() { }

  // authenticate/login
  public loginRequest(request: RequestAuthentication): Observable<ResponseAuthentication> {
    return this.http.post<ResponseAuthentication>(this.url + this.requestMapping + 'login', request)
  }

  public validateResponseAuthentication(responseAuthentication: ResponseAuthentication) : boolean{
    return !Tools.isBlank(responseAuthentication.jwtToken) && 
      !Tools.isBlank(responseAuthentication.username) && 
      responseAuthentication.roles != null &&
      responseAuthentication.roles.length > 0
  }




}
