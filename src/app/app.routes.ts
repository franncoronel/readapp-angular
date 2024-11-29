import { Routes } from '@angular/router'
import { LoginComponent } from './vistas/login/login.component'
import { BusquedaPrincipalComponent } from './vistas/busqueda-principal/busqueda-principal.component'
import { MisRecomendacionesComponent } from './vistas/mis-recomendaciones/mis-recomendaciones.component'
import { DetalleRecomendacionComponent } from './vistas/detalle-recomendacion/detalle-recomendacion.component'
import { EdicionRecomendacionComponent } from './vistas/edicion-recomendacion/edicion-recomendacion.component'
import { VistaPerfilComponent } from './vistas/vista-perfil/vista-perfil.component'
import { BusquedaDeLibrosComponent } from './vistas/busqueda-de-libros/busqueda-de-libros.component'
import { NuevaValoracionComponent } from './vistas/nueva-valoracion/nueva-valoracion.component'
import { FormularioPerfilComponent } from './vistas/formulario-perfil/formulario-perfil.component'
import { PerfilAmigosComponent } from './vistas/perfil-amigos/perfil-amigos.component'
import { PerfilLibrosALeerComponent } from './vistas/perfil-libros-a-leer/perfil-libros-a-leer.component'
import { PerfilLibrosLeidosComponent } from './vistas/perfil-libros-leidos/perfil-libros-leidos.component'
import { RecomendacionesAValorarComponent } from './vistas/recomendaciones-a-valorar/recomendaciones-a-valorar.component'
import { prevenirNavegacionLoginGuard } from './data/guard/prevenir-navegacion-login.guard'
import { barraDeNavegacionGuard } from './data/guard/barra-navegacion.guard'

export const LOGIN = 'login'
export const PAGINA_PRINCIPAL = 'busqueda-principal'
export const DETALLE_RECOMENDACION = 'detalle-recomendacion/:id'
export const EDICION_RECOMENDACION = 'edicion-recomendacion/:id'
export const NUEVA_VALORACION = 'nueva-valoracion/:id'
export const MIS_RECOMENDACIONES = 'mis-recomendaciones'
export const BUSQUEDA_LIBROS = 'busqueda-de-libros'
export const PERFIL = 'perfil'
export const PERFIL_INFORMACION = "informacion"
export const PERFIL_LIBROS_A_LEER = 'libros-a-leer'
export const PERFIL_LIBROS_LEIDOS = 'libros-leidos'
export const PERFIL_AMIGOS = 'amigos'
export const PERFIL_RECOMENDACIONES_A_VALORAR = 'recomendaciones-a-valorar'

export const routes: Routes = [
    { path: LOGIN, component: LoginComponent, canDeactivate: [prevenirNavegacionLoginGuard]},
    { path: PAGINA_PRINCIPAL, component: BusquedaPrincipalComponent, canActivate: [barraDeNavegacionGuard]},
    { path: DETALLE_RECOMENDACION, component: DetalleRecomendacionComponent, canActivate: [barraDeNavegacionGuard]},
    { path: EDICION_RECOMENDACION, component: EdicionRecomendacionComponent, canActivate: [barraDeNavegacionGuard],data:{
        reutilizarComponenteGrilla: true
    }},
    { path: NUEVA_VALORACION, component: NuevaValoracionComponent, canActivate: [barraDeNavegacionGuard]},
    { path: MIS_RECOMENDACIONES, component: MisRecomendacionesComponent, canActivate: [barraDeNavegacionGuard]},
    { path: BUSQUEDA_LIBROS, component: BusquedaDeLibrosComponent, canActivate: [barraDeNavegacionGuard]},
    { path: PERFIL, component: VistaPerfilComponent,children:
        [
            {path: PERFIL_INFORMACION,component:FormularioPerfilComponent, canActivate: [barraDeNavegacionGuard]},
            {path: PERFIL_LIBROS_A_LEER,component:PerfilLibrosALeerComponent, canActivate: [barraDeNavegacionGuard],data:{
                reutilizarComponenteGrilla: true
            }},
            {path: PERFIL_LIBROS_LEIDOS,component:PerfilLibrosLeidosComponent, canActivate: [barraDeNavegacionGuard],data:{
                reutilizarComponenteGrilla: true
            }},
            {path: PERFIL_AMIGOS,component:PerfilAmigosComponent, canActivate: [barraDeNavegacionGuard]},
            {path: PERFIL_RECOMENDACIONES_A_VALORAR,component:RecomendacionesAValorarComponent, canActivate: [barraDeNavegacionGuard]},
            {path: "**", redirectTo:PERFIL_INFORMACION},
        ]
    },
    { path: '**', redirectTo: LOGIN},
]
