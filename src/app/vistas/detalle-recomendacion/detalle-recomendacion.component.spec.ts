import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DetalleRecomendacionComponent } from './detalle-recomendacion.component'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { StubRecomendacionService } from '../../data/stub/stub.recomendacion.service'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
import { HttpClient } from '@angular/common/http'

describe('DetalleRecomendacionComponent', () => {
  let component: DetalleRecomendacionComponent
  let fixture: ComponentFixture<DetalleRecomendacionComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let recomendacionService!: StubRecomendacionService
  let recomendacionIdExistente: number
  
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    recomendacionService = new StubRecomendacionService

    const subscribeOk = (f: (value: Params) => void) => {
      f( {id: recomendacionIdExistente })
    }

    await TestBed.configureTestingModule({
      imports: [DetalleRecomendacionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {params : {subscribe : subscribeOk}}},
        { provide: RecomendacionService, useValue: recomendacionService},
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(DetalleRecomendacionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
