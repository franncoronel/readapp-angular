import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GrillaRecomendacionesComponent } from './grilla-recomendaciones.component'
import { RouterModule } from '@angular/router'
import { RecomendacionService } from '../../../data/services/recomendacion.service'
import { StubRecomendacionService } from '../../../data/stub/stub.recomendacion.service'

describe('GrillaReComponent', () => {
  let component: GrillaRecomendacionesComponent
  let fixture: ComponentFixture<GrillaRecomendacionesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrillaRecomendacionesComponent, RouterModule.forRoot([])],
      providers: [
        { provide: RecomendacionService, useClass: StubRecomendacionService }
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(GrillaRecomendacionesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
