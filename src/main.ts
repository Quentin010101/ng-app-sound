import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { inject } from '@angular/core';
import { AuthenticationService } from './app/service/security/authentication.service';

export function initializeUserConfig() {
  const _authenticationService = inject(AuthenticationService)
  
  return () => _authenticationService.init()
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
