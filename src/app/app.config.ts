import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter, RouteReuseStrategy } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { ReutilizacionDeRutas } from './reutilizacion-de-rutas'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),{ provide: RouteReuseStrategy, useClass: ReutilizacionDeRutas }, provideAnimationsAsync(), provideAnimationsAsync()]
}
