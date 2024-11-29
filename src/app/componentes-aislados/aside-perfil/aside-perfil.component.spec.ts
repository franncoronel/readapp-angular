import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AsidePerfilComponent } from './aside-perfil.component'
import { RouterModule } from '@angular/router'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { UsuarioService } from '../../data/services/usuario.service'
import { StubRecomendacionService } from '../../data/stub/stub.recomendacion.service'
import { obtenerViaTestId } from '../../test-utils'
import { Usuario } from '../../data/domain/usuario.domain'
import { usuarioConAmigo } from '../../mocks/MockProvider'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'


describe('AsidePerfilComponent', () => {
  let component: AsidePerfilComponent
  let fixture: ComponentFixture<AsidePerfilComponent>
  const usuarioSuscripto: Usuario = usuarioConAmigo
  let httpClientSpy: jasmine.SpyObj<HttpClient>


  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [AsidePerfilComponent, RouterModule.forRoot([])],
      providers: [
        { provide: RecomendacionService, useClass: StubRecomendacionService },
        { provide: HttpClient, useValue: httpClientSpy } 
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(AsidePerfilComponent)
    component = fixture.componentInstance
    await sincronizarUsuarioLogueado(component)
    fixture.detectChanges()

  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("Deberia cargarse el usuario logueado de forma asincronica", async()=>{
    expect(component.usuario.username).toBe(usuarioSuscripto.username)
  })
  it("Deberia poner el estilado de activa solo a la opcion que esta activa", async()=>{
    const compiled = fixture.nativeElement
    const pestañas = compiled.querySelectorAll('.pestaña')
    component.urlActual = '/perfil/amigos' //La pestaña 1 es la del perfil amigos
    fixture.detectChanges()
    expect(pestañas[0].classList).not.toContain('activa')
    expect(pestañas[1].classList).toContain('activa')
    expect(pestañas[2].classList).not.toContain('activa')
    expect(pestañas[3].classList).not.toContain('activa')
  })
  it('si se presiona el link de amigos, redirige a esa direccion', async () => {
    spyOn(component,"navegarAmigos" as never)
    obtenerViaTestId (fixture, 'linkAmigos').click()
    fixture.detectChanges()
    expect(component.navegarAmigos).toHaveBeenCalled()
  })
  it('si se presiona el link informacion, redirige a esa direccion', async () => {
    spyOn(component,"navegarInfo" as never)
    obtenerViaTestId (fixture, 'linkInfo').click()
    fixture.detectChanges()
    expect(component.navegarInfo).toHaveBeenCalled()
  })
  it('si se presiona el link de libros a leer, redirige a esa direccion', async () => {
    spyOn(component,"navegarLibrosALeer" as never)
    obtenerViaTestId (fixture, 'linkALeer').click()
    fixture.detectChanges()
    expect(component.navegarLibrosALeer).toHaveBeenCalled()
  })
  it('si se presiona el link de libros leidos, redirige a esa direccion', async () => {
    spyOn(component,"navegarLibrosLeidos" as never)
    obtenerViaTestId (fixture, 'linkLeidos').click()
    fixture.detectChanges()
    expect(component.navegarLibrosLeidos).toHaveBeenCalled()
  })
  it('si se presiona el link de recomendaciones a valorar, redirige a esa direccion', async () => {
    spyOn(component,"navegarRecomendacionesAValorar" as never)
    obtenerViaTestId (fixture, 'linkAValorar').click()
    fixture.detectChanges()
    expect(component.navegarRecomendacionesAValorar).toHaveBeenCalled()
  })

  async function sincronizarUsuarioLogueado(componente : AsidePerfilComponent) {
    const mockUsuarioService = TestBed.inject(UsuarioService)
    spyOn(mockUsuarioService, 'obtenerUsuarioLogueado').and.returnValue(Promise.resolve(usuarioSuscripto))
    await componente.ngOnInit()
}
})


