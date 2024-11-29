import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TarjetaValoracionComponent } from './tarjeta-valoracion.component'
import { valoracionPositiva } from '../../mocks/MockProvider'

describe('TarjetaValoracionComponent', () => {
  let component: TarjetaValoracionComponent
  let fixture: ComponentFixture<TarjetaValoracionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaValoracionComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(TarjetaValoracionComponent)
    component = fixture.componentInstance
    component.valoracion = valoracionPositiva
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
