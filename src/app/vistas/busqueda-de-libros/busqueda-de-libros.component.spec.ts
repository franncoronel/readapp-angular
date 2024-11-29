import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BusquedaDeLibrosComponent } from './busqueda-de-libros.component'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'
import { obtenerViaTestId } from '../../test-utils'
import { BarraDeBusquedaComponent } from '../../componentes-aislados/barra-de-busqueda/barra-de-busqueda.component'
import { By } from '@angular/platform-browser'

describe('BusquedaDeLibrosComponent', () => {
  let component: BusquedaDeLibrosComponent
  let fixture: ComponentFixture<BusquedaDeLibrosComponent>
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    await TestBed.configureTestingModule({
      imports: [BusquedaDeLibrosComponent, BarraDeBusquedaComponent],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BusquedaDeLibrosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    await fixture.whenStable()
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it("debería mostrar dos libros", () => {
    expect(component.libros.length).toBe(2)
  })

  it("si la barra de búsqueda está vacía, la colección de libros no sufre modificaciones", () => {
    const barraDeBusqueda = fixture.debugElement.query(By.css('[data-testid="componente-barra-de-busqueda"]'))
    const componenteBarraDeBusqueda = barraDeBusqueda.componentInstance
    const barraDeBusquedaInput = barraDeBusqueda.nativeElement.querySelector('[data-testid="input-barra-de-busqueda"]') //No se puede usar obtenerViaTestId ya que barra de búsqueda es un Debug element, no un fixture.
    barraDeBusquedaInput.value = "" //No se escribe nada en la barra de búsqueda o se borra lo que estaba
    barraDeBusquedaInput.dispatchEvent(new Event('input'))  // Dispara el evento 'input'
    componenteBarraDeBusqueda.buscar() // Emite el evento 'nuevaBusqueda' sin ningún valor
    fixture.detectChanges()
    const grillaDeLibros = obtenerViaTestId(fixture, "grilla-de-libros")
    expect(grillaDeLibros.querySelectorAll(`[data-testid="libro-grilla"]`).length).toBe(2)
  })
  
  it("una búsqueda de libros exitosa filtra la colección de libros", () => {
    const barraDeBusqueda = fixture.debugElement.query(By.css('[data-testid="componente-barra-de-busqueda"]'))
    const componenteBarraDeBusqueda = barraDeBusqueda.componentInstance
    const barraDeBusquedaInput = barraDeBusqueda.nativeElement.querySelector('[data-testid="input-barra-de-busqueda"]') //No se puede usar obtenerViaTestId ya que barra de búsqueda es un Debug element, no un fixture.
    barraDeBusquedaInput.value = "odi" //Se escribe "odi" en la barra de búsqueda
    barraDeBusquedaInput.dispatchEvent(new Event('input'))  // Dispara el evento 'input'
    componenteBarraDeBusqueda.buscar() // Emite el evento 'nuevaBusqueda' con el valor de 'odi'
    fixture.detectChanges()
    const grillaDeLibros = obtenerViaTestId(fixture, "grilla-de-libros")
    expect(grillaDeLibros.querySelectorAll(`[data-testid="libro-grilla"]`).length).toBe(1)
  })

  it("una búsqueda de libros no exitosa no arroja ningún resultado", () => {
    const barraDeBusqueda = fixture.debugElement.query(By.css('[data-testid="componente-barra-de-busqueda"]'))
    const componenteBarraDeBusqueda = barraDeBusqueda.componentInstance
    const barraDeBusquedaInput = barraDeBusqueda.nativeElement.querySelector('[data-testid="input-barra-de-busqueda"]') //No se puede usar obtenerViaTestId ya que barra de búsqueda es un Debug element, no un fixture.
    barraDeBusquedaInput.value = "aleph" //Se escribe "aleph" en la barra de búsqueda
    barraDeBusquedaInput.dispatchEvent(new Event('input'))  // Dispara el evento 'input'
    componenteBarraDeBusqueda.buscar() // Emite el evento 'nuevaBusqueda' con el valor de 'aleph'
    fixture.detectChanges()
    const grillaDeLibros = obtenerViaTestId(fixture, "grilla-de-libros")
    expect(grillaDeLibros.querySelectorAll(`[data-testid="libro-grilla"]`).length).toBe(0)
  })
})
