import { ComponentFixture, TestBed } from '@angular/core/testing'
import { GrillaComponent } from './grilla.component'
import { RouterModule } from '@angular/router'
import { LibroPipe } from '../../../data/libro.pipe'
import { By } from '@angular/platform-browser'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../../data/services/http-client-spy.service'
import { libroConUnSoloIdioma } from '../../../mocks/MockProvider'
import { obtenerViaTestId } from '../../../test-utils'

describe('GrillaComponent', () => {
  let component: GrillaComponent
  let fixture: ComponentFixture<GrillaComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [GrillaComponent, LibroPipe, RouterModule.forRoot([])],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy } //Es importante cambiar useClass por useValue. Tiene sentido porque ahora el proveedor ahora es una constante, no una clase stubbeada.
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(GrillaComponent)
    component = fixture.componentInstance
    component.libros = [libroConUnSoloIdioma,libroConUnSoloIdioma]
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('debería mostrar los libros que recibe al consultar al backend', () => {
    const librosBackend = fixture.debugElement.queryAll(By.css('readapp-libro'))
    expect(librosBackend.length).toBe(2)
  })

  it('Por default, el boton de agregar no debería verse', () => {
    const elementoBoton = obtenerViaTestId(fixture, "agregar-libro")
    expect(elementoBoton).toBeFalsy()
  })

  it("deberia agregar el boton de agregar", () => {
    component.mostrarBoton = true
    fixture.detectChanges()
    const elementoBoton = obtenerViaTestId(fixture, "agregar-libro")
    expect(elementoBoton).toBeTruthy()
    expect(elementoBoton.hidden).toBeFalse()
  })

  it('Debería mostrar los libros que reciba por input', () =>{
    component.libros = [libroConUnSoloIdioma]
    fixture.detectChanges()
    const elementoLibros = fixture.debugElement.queryAll(By.css('readapp-libro'))
    expect(elementoLibros.length).toBe(1)
  })
})