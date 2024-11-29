import { HttpClient } from "@angular/common/http"
import { obtenerHttpClientSpy } from "./http-client-spy.service"
import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"

describe('UsuarioService',()=>{
    let httpClientSpy: jasmine.SpyObj<HttpClient>
    let authService: AuthService

    beforeEach(async ()=> {
        httpClientSpy = obtenerHttpClientSpy()
        TestBed.configureTestingModule({
            providers: [
              AuthService,
              { provide: HttpClient, useValue: httpClientSpy }
            ]
        })
        authService = TestBed.inject(AuthService)
    })

    it('Si hay un id en el storage, devolver que esta logueado',async ()=> {
        spyOn(sessionStorage,'getItem').and.returnValue("1")
        expect(authService.estaLogueado()).toBeTrue()
    })

    it('Si no hay un id en el storage, devolver que no esta logueado',async ()=> {
        spyOn(sessionStorage,'getItem').and.returnValue(null)
        expect(authService.estaLogueado()).toBeFalse()
    })

    it('Debería eliminar datos del storage tras logout', () => {
        spyOn(sessionStorage,'removeItem').and.callThrough()
        authService.logout()
        expect(sessionStorage.removeItem).toHaveBeenCalled()
    })
})
