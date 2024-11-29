import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EdicionRecomendacionComponent } from './edicion-recomendacion.component'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { StubRecomendacionService } from '../../data/stub/stub.recomendacion.service'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { HttpClient } from '@angular/common/http'
import { Recomendacion, EdicionRecomendacionDTO } from '../../data/domain/recomendacion.domain'
import { of } from 'rxjs'
import { URL_SERVIDOR_REST } from '../../data/services/configuracion'
import { recomendacionPrivada } from '../../mocks/MockProvider'
import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'

describe('EdicionRecomendacionComponent', () => {
  let component: EdicionRecomendacionComponent
  let fixture: ComponentFixture<EdicionRecomendacionComponent>
  let routerSpy: jasmine.SpyObj<Router>
  let recomendacionService!: StubRecomendacionService
  let recomendacionIdExistente: number
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    httpClientSpy = obtenerHttpClientSpy()
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    recomendacionService = new StubRecomendacionService
    const recomendacion = recomendacionService.getListaRecomendaciones()[1]
    recomendacionIdExistente = recomendacion.id
    // recomendacionTituloExistente = recomendacion.titulo

    const subscribeOk = (f: (value: Params) => void) => {
      f( {id: recomendacionIdExistente })
    }

    await TestBed.configureTestingModule({
      imports: [EdicionRecomendacionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {params : {subscribe : subscribeOk}}},
        { provide: RecomendacionService, useValue: recomendacionService},
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents()

    fixture = TestBed.createComponent(EdicionRecomendacionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

describe("actualizacion de una recomendación", () => {
  let servicio: RecomendacionService
  let httpClientSpy: jasmine.SpyObj<HttpClient>

 
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put'])
    TestBed.configureTestingModule({
        providers: [
            RecomendacionService,
            { provide: HttpClient, useValue: httpClientSpy }
        ]
    })

    servicio = TestBed.inject(RecomendacionService)
})

it('debería actualizar la recomendación correctamente', async () => {
  /* Creo una recomendación */
    const recomendacion = recomendacionPrivada

    /* Cambio el título */
     recomendacion.titulo = "Título cambiado"
    /* Convierto la recomendación a DTO */
    const edicionRecomendacionDTO: EdicionRecomendacionDTO = Recomendacion.toDTOEdicionRecomendacion(recomendacion)
    /* Simulo el envío del request */
    httpClientSpy.put.and.returnValue(of(null))
    /*  Llamar al servicio para enviar la recomendación actualizada */
    await servicio.actualizarRecomendacion(recomendacion)

    expect(httpClientSpy.put).toHaveBeenCalledWith(
      `${URL_SERVIDOR_REST}/recomendaciones/${recomendacion.id}`,
      edicionRecomendacionDTO
    )
  }) 
})
