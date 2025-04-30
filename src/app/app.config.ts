import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from '@angular/common/http';
import { routes } from "./app.routes";
import { AuthService } from './modules/auth/services/auth.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), 
        provideAnimationsAsync(),
        provideHttpClient(),
        AuthService
    ]
};
