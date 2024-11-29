import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TarjetaRecomendacionComponent } from './tarjeta-recomendacion.component'
import { RouterModule } from '@angular/router'
import { StubRecomendacionService } from '../../data/stub/stub.recomendacion.service'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { recomendacionPublica, usuarioConAmigo } from '../../mocks/MockProvider'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'

describe('TarjetaRecomendacionComponent', () => {
  let component: TarjetaRecomendacionComponent
  let fixture: ComponentFixture<TarjetaRecomendacionComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [TarjetaRecomendacionComponent, RouterModule.forRoot([])],
      providers: [
        { provide: RecomendacionService, useClass: StubRecomendacionService },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(TarjetaRecomendacionComponent)
    component = fixture.componentInstance
    component.recomendacion = recomendacionPublica
    component.usuario = usuarioConAmigo
    fixture.detectChanges()
  })

  it('se crea correctamente', () => {
    expect(component).toBeTruthy()
  })

  it('la cantidad de libros de la recomendacion deberia ser 2', () => {
    expect(component.recomendacion.cantidadLibros).toBe(2)
  })

  it('dado un usuario que no puede valorar, el corazón no debe aparecer', async () => {
    component.usuario.yaEstaParaValorar = jasmine.createSpy().and.returnValue(false)
    component.recomendacion.puedeValorar = false
    await component.ngOnInit()
    expect(component.iconoCorazon).toBe(false)
    expect(component.corazonVacio).toBe(true)
  }) 
})
