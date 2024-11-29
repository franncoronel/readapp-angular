import { ComponentFixture, TestBed } from '@angular/core/testing'
import { LibroComponent } from './libro.component'
import { libroConMuchosIdiomas, libroConUnSoloIdioma, libroDesafianteYBestSeller, libroNoDesafianteNoBestSeller } from '../../mocks/MockProvider'
import { HttpClient } from '@angular/common/http'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { obtenerViaTestId } from '../../test-utils'

describe('LibroComponent', () => {
  let component: LibroComponent
  let fixture: ComponentFixture<LibroComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [LibroComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(LibroComponent)
    component = fixture.componentInstance
    component.libro = libroConUnSoloIdioma
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('debería mostrar con el formato apropiado un libro con un solo idioma', () => {
    const idiomas = buscarStringDeIdiomas()
    expect(idiomas.textContent).toBe('Japonés ')
  })
 
  it('si un libro tiene más de un idioma, estos se muestran en el formato apropiado', () => {
    component.libro = libroConMuchosIdiomas
    fixture.detectChanges()
    const idiomas = buscarStringDeIdiomas()
    expect(idiomas.textContent).toBe('Inglés - Español - Ruso ')
  })
  it("no debería renderizar ninguna insignia si un libro no es ni best seller ni desafiante", () => {
    component.libro = libroNoDesafianteNoBestSeller
    fixture.detectChanges()
    const insigniaDesafiante = obtenerViaTestId(fixture, "desafiante")
    const insigniaBestSeller = obtenerViaTestId(fixture, "best-seller")
    expect(insigniaDesafiante).toBeFalsy()
    expect(insigniaBestSeller).toBeFalsy()
  })
  it("debería renderizar sólo la insignia correspondiente cuando un libro es best seller", () => {
    const insigniaDesafiante = obtenerViaTestId(fixture, "desafiante")
    const insigniaBestSeller = obtenerViaTestId(fixture, "best-seller")
    expect(insigniaDesafiante).toBeFalsy()
    expect(insigniaBestSeller).toBeTruthy()
  })
  it("debería renderizar sólo la insignia correspondiente cuando un libro es desafiante", () => {
    component.libro = libroConMuchosIdiomas
    fixture.detectChanges()
    const insigniaDesafiante = obtenerViaTestId(fixture, "desafiante")
    const insigniaBestSeller = obtenerViaTestId(fixture, "best-seller")
    expect(insigniaDesafiante).toBeTruthy()
    expect(insigniaBestSeller).toBeFalsy()
  })
  it("debería renderizar ambas insignias si un libro es best seller y desafiante", () => {
    component.libro = libroDesafianteYBestSeller
    fixture.detectChanges()
    const insigniaDesafiante = obtenerViaTestId(fixture, "desafiante")
    const insigniaBestSeller = obtenerViaTestId(fixture, "best-seller")
    expect(insigniaDesafiante).toBeTruthy()
    expect(insigniaBestSeller).toBeTruthy()
  })
  it("no debería renderizar el botón de basura por defecto", () => {
    const botonDeBasura = obtenerViaTestId(fixture, "boton-basura")
    expect(botonDeBasura).toBeFalsy()
  })
  
  
function buscarStringDeIdiomas(){
  return fixture.debugElement.nativeElement.querySelector('[data-testid="idiomas"]')
}
})