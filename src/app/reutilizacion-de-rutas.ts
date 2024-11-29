 
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router'
// import { BUSQUEDA_LIBROS } from './app.routes'

@Injectable({
    providedIn: 'root',
})
export class ReutilizacionDeRutas implements RouteReuseStrategy {
    private rutasGuardadas = new Map<string, DetachedRouteHandle>()

    ngOnInit(){
        console.log(this.rutasGuardadas)
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.rutasGuardadas.has(this.crearClave(route))
    }

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const reutilizarComponenteGrilla = route.data["reutilizarComponenteGrilla"]
        if(reutilizarComponenteGrilla){
            return true
        }
        return false
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        if(handle===null) return
        const clave = this.crearClave(route)
        this.rutasGuardadas.set(clave, handle)
    }
    
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.rutasGuardadas.get(this.crearClave(route)) ?? null
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return curr.routeConfig === future.routeConfig
    }

    private crearClave(route:ActivatedRouteSnapshot):string{
        const ruta = route.pathFromRoot
        .map(node=>node.url.join("/"))
        .filter(Boolean)
        .join("/")
        return "/" + ruta
    }
}