import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestInterceptor } from './interceptor/requestInterceptor';
import { responseInterceptor } from './interceptor/responseInterceptor';
import { initializeUserConfig } from '../main';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(),
    withViewTransitions()), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([requestInterceptor,responseInterceptor])
    )
    ,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUserConfig,
      multi: true,
      deps: [],
    },
  ]
};
