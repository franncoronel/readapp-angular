import { HttpClient } from "@angular/common/http"
import { obtenerHttpClientSpy, usuarioDTODelBack } from "./http-client-spy.service"
import { UsuarioService } from "./usuario.service"
import { TestBed } from "@angular/core/testing"
import { Usuario } from "../domain/usuario.domain"
import { of } from "rxjs"

describe('UsuarioService',()=>{
    let httpClientSpy: jasmine.SpyObj<HttpClient>
    let usuarioService: UsuarioService
    let usuarioAActualizar : Usuario

    beforeEach(async ()=> {
        httpClientSpy = obtenerHttpClientSpy()
        TestBed.configureTestingModule({
            providers: [
              UsuarioService,
              { provide: HttpClient, useValue: httpClientSpy }
            ]
          })
          usuarioService = TestBed.inject(UsuarioService)
          usuarioAActualizar = new Usuario(
            1,
            "Hedy",
            "Lamarr",
            "hdlmr",
            "80211",
            new Date(),
            "hdlamarr@gmail",
            100,
            "Ansioso",
            ["Poliglota"],
            [],
            [],
            [],
            "mono.png",
            [],
            0,
            0)
    })
    it('Debería obtener un usuario por Id, si es que este existe',async ()=> {
        const usuarioRecibido = await usuarioService.obtenerUnUsuario(1)
        const usuarioDelMock = Usuario.fromDTO(usuarioDTODelBack) //Esta es la respuesta
        expect(usuarioRecibido.nombre).toEqual(usuarioDelMock.nombre)
    })

    it('Deberia guardar el usuario mandando un put request al back, si no tiene errores', async () =>{
        spyOn(usuarioService,'actualizarDatosFormulario').and.callThrough()
        spyOn(usuarioAActualizar,'validarUsuario').and.callThrough()
        usuarioService.guardarUsuario(usuarioAActualizar)
        expect(usuarioService.actualizarDatosFormulario).toHaveBeenCalled()
        expect(usuarioAActualizar.validarUsuario).toHaveBeenCalled()
    })

    it('Deberia no hacer el request si el usuario tiene errores', async () =>{
        usuarioAActualizar.email = "" //Si el usuario no tiene nombre es un error y no debería llamarse a actualizar
        spyOn(usuarioService,'actualizarDatosFormulario').and.callThrough()
        spyOn(usuarioAActualizar,'validarUsuario').and.callThrough()
        usuarioService.guardarUsuario(usuarioAActualizar)
        expect(usuarioAActualizar.validarUsuario).toHaveBeenCalled()
        expect(usuarioService.actualizarDatosFormulario).not.toHaveBeenCalled()
    })

    it('Debería recibir un usuarioDTO del back si actualiza libros a leer', async () => {
        const libroId = 1
        const usuarioId = usuarioAActualizar.id
    
        httpClientSpy.put.and.returnValue(of(usuarioDTODelBack))
        const usuarioEnviado = await usuarioService.agregarLibroALeer(usuarioId, libroId)
        expect(usuarioEnviado).toEqual(usuarioDTODelBack)
        expect(httpClientSpy.put).toHaveBeenCalledWith(
            `http://localhost:9000/usuarios/${usuarioId}/agregar-libro-a-leer`, 
            libroId
        )
    })
    
    it('Debería recibir un usuarioDTO del back si actualiza libros leídos', async () => {
        const libroId = 1
        const usuarioId = usuarioAActualizar.id
    
        httpClientSpy.put.and.returnValue(of(usuarioDTODelBack))
        const usuarioEnviado = await usuarioService.agregarLibroLeido(usuarioId, libroId)
        expect(usuarioEnviado).toEqual(usuarioDTODelBack)
        expect(httpClientSpy.put).toHaveBeenCalledWith(
            `http://localhost:9000/usuarios/${usuarioId}/agregar-libro-leido`, 
            libroId
        )
    })

    it('Deberia recibir un usuarioDTO del back si actualiza recomendaciones a valorar', async () =>{
        const usuarioEnviado = await usuarioService.actualizarRecomendacionesAValorar(usuarioAActualizar)
        expect(usuarioEnviado).toEqual(usuarioDTODelBack)
    })
})
