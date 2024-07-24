import { inject } from '@angular/core';
import {
  HttpEvent, HttpRequest,
  HttpHeaders,
  HttpHandlerFn
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/security/authentication.service';


export function requestInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const _authenticationService = inject(AuthenticationService);

  if(_authenticationService.getUserIsAuthenticated && _authenticationService.getUserHasToken){

    const headers = new HttpHeaders({
      Authorization:  `Bearer ${_authenticationService.getToken}`
    })
  
    const newReq = req.clone({
      headers
    })
    
    return next(newReq)
  }

  return next(req)
}