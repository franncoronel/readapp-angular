import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PerfilLibrosLeidosComponent } from './perfil-libros-leidos.component'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { UsuarioService } from '../../data/services/usuario.service'
import { usuarioConAmigo } from '../../mocks/MockProvider'

describe('PerfilLibrosLeidosComponent', () => {
  let component: PerfilLibrosLeidosComponent
  let fixture: ComponentFixture<PerfilLibrosLeidosComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let mockUsuarioService: jasmine.SpyObj<UsuarioService> 

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    mockUsuarioService = jasmine.createSpyObj('UsuarioService',['obtenerUsuarioLogueado'])
    await TestBed.configureTestingModule({
      imports: [PerfilLibrosLeidosComponent],
      providers: [{ provide: HttpClient, useValue: httpClientSpy}]
    })
    .compileComponents()

    fixture = TestBed.createComponent(PerfilLibrosLeidosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("deberia cargar los libros del usuario logueado", async ()=>{
    sincronizarUsuarioLogueado()
    expect(component.libros).toBe(usuarioConAmigo.librosLeidos)
  })

  function sincronizarUsuarioLogueado() {
    mockUsuarioService.obtenerUsuarioLogueado.and.returnValue(Promise.resolve(usuarioConAmigo))
    component.cargarUsuario(usuarioConAmigo)
    fixture.detectChanges()
  }
})
