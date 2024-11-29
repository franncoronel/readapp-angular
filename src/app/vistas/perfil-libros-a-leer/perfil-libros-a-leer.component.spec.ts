import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PerfilLibrosALeerComponent } from './perfil-libros-a-leer.component'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'
import { usuarioConAmigo } from '../../mocks/MockProvider'
import { Usuario } from '../../data/domain/usuario.domain'
import { LibroPipe } from '../../data/libro.pipe'

describe('PerfilLibrosALeerComponent', () => {
  let component: PerfilLibrosALeerComponent
  let fixture: ComponentFixture<PerfilLibrosALeerComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let usuarioLogueado : Usuario

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [PerfilLibrosALeerComponent, LibroPipe],
      providers: [{ provide: HttpClient, useValue: httpClientSpy}]
    })
    .compileComponents()

    fixture = TestBed.createComponent(PerfilLibrosALeerComponent)
    component = fixture.componentInstance
    usuarioLogueado = usuarioConAmigo
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("deberia cargar los libros del usuario logueado", async ()=>{
    await component.cargarUsuario(usuarioLogueado)
    fixture.detectChanges()
    expect(component.libros).toEqual(usuarioLogueado.librosALeer)
  })
})
