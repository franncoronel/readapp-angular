import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarraBusquedaFiltroComponent } from './barra-busqueda-filtro.component'

describe('BarraBusquedaFiltroComponent', () => {
  let component: BarraBusquedaFiltroComponent
  let fixture: ComponentFixture<BarraBusquedaFiltroComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBusquedaFiltroComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(BarraBusquedaFiltroComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
