import { ComponentFixture, TestBed } from '@angular/core/testing'
import { obtenerViaTestId } from '../../test-utils'
import { HeaderComponent } from './header.component'
import { Router } from '@angular/router'
import { BUSQUEDA_LIBROS, LOGIN, MIS_RECOMENDACIONES, PAGINA_PRINCIPAL, PERFIL } from '../../app.routes'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'
import { UsuarioService } from '../../data/services/usuario.service'
import { usuarioConAmigo } from '../../mocks/MockProvider'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  const router = {navigate: jasmine.createSpy('navigate')}
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let mockUsuarioService: jasmine.SpyObj<UsuarioService> 

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    mockUsuarioService = jasmine.createSpyObj('UsuarioService',['obtenerUsuarioLogueado', 'logout'])
    
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: UsuarioService, useValue: mockUsuarioService},
        { provide: HttpClient, useValue:httpClientSpy}
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  
  it('Debería no crear los componentes si no tiene un usuario cargado', async() => {
    const x = obtenerViaTestId(fixture,"headerMain")
    expect(x).toBeFalsy()
  })

  it('Debería crear los componentes si tiene un usuario cargado', async() => {
    await sincronizarUsuarioLogueado()
    const x = obtenerViaTestId(fixture,"nombreUsuario")
    expect(x.innerHTML).toContain(usuarioConAmigo.username)
    expect(component.usuario).toEqual(usuarioConAmigo)
  })

  it('si se presiona el logo, redirigir a home', async () => {
    await sincronizarUsuarioLogueado()
    spyOn(component,"navegarAHome" as never).and.callThrough()
    obtenerViaTestId(fixture, 'logoApp').click()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith([PAGINA_PRINCIPAL])
    expect(component.navegarAHome).toHaveBeenCalled()
  })

  it('si se presiona el link de busqueda de libros, redirige a esa direccion', async () => {
    await sincronizarUsuarioLogueado()
    spyOn(component,"navegarABusquedaDeLibros" as never).and.callThrough()
    obtenerViaTestId(fixture, 'linkBusquedaLibros').click()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith([BUSQUEDA_LIBROS])
    expect(component.navegarABusquedaDeLibros).toHaveBeenCalled()
  })

  it('si se presiona el link de mis recomendaciones, redirige a esa direccion', async () => {
    await sincronizarUsuarioLogueado()
    spyOn(component,"navegarAMisRecomendaciones" as never).and.callThrough()
    obtenerViaTestId(fixture, 'linkMisRecomendaciones').click()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith([MIS_RECOMENDACIONES])
    expect(component.navegarAMisRecomendaciones).toHaveBeenCalled()
  })
  it('si se presiona el link de perfil, redirige a esa direccion', async () => {
    await sincronizarUsuarioLogueado()
    spyOn(component,"navegarAInfoPerfil" as never).and.callThrough()
    obtenerViaTestId(fixture, 'linkInfoPerfil').click()
    fixture.detectChanges()
    expect(router.navigate).toHaveBeenCalledWith([PERFIL])
    expect(component.navegarAInfoPerfil).toHaveBeenCalled()
  })
  it('si se presiona el desloguear, redirige a la sección de Login', async () => {
    await sincronizarUsuarioLogueado()
    spyOn(component,"navegarALogin" as never).and.callThrough()
    obtenerViaTestId(fixture, 'linkLogin').click()
    fixture.detectChanges()
    expect(component.navegarALogin).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith([LOGIN])
  })

  async function sincronizarUsuarioLogueado() {
    mockUsuarioService.obtenerUsuarioLogueado.and.returnValue(Promise.resolve(usuarioConAmigo))
    await component.ngOnInit()
    fixture.detectChanges()
  }
})