import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ClientService, API_BASE_URL } from './app/services/api.service';

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...(appConfig.providers || []),
//     provideRouter(routes)
//   ]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    { provide: API_BASE_URL, useValue: 'https://localhost:7211' },
    ClientService
  ]
}).catch(err => console.error(err));