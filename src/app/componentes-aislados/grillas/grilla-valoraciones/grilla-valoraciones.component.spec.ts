import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GrillaValoracionesComponent } from './grilla-valoraciones.component'
import { RouterModule } from '@angular/router'
import { StubRecomendacionService } from '../../../data/stub/stub.recomendacion.service'
import { RecomendacionService } from '../../../data/services/recomendacion.service'
import { recomendacionConValoracion } from '../../../mocks/MockProvider'

describe('GrillaValoracionesComponent', () => {
  let component: GrillaValoracionesComponent
  let fixture: ComponentFixture<GrillaValoracionesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaValoracionesComponent, RouterModule.forRoot([])],
      providers: [
        { provide: RecomendacionService, useClass: StubRecomendacionService }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(GrillaValoracionesComponent)
    component = fixture.componentInstance
    component.recomendacion = recomendacionConValoracion
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})