import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
    provideAnimationsAsync(),
    provideAnimations(),
    MatDialogModule, //añado angular/material/dialog a los providers para  que se pueda usar en la aplicación(modal)
    DatePipe
  ]
};