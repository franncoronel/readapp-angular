// import { ComponentFixture, TestBed } from '@angular/core/testing'
// import { NuevaValoracionComponent } from './nueva-valoracion.component'
// import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router'

// import { StubRecomendacionService } from '../../data/stub/stub.recomendacion.service'
// import { RecomendacionService } from '../../data/services/recomendacion.service'

// describe('NuevaValoracionComponent', () => {
//   let component: NuevaValoracionComponent
//   let fixture: ComponentFixture<NuevaValoracionComponent>
//   let routerSpy: jasmine.SpyObj<Router>
//   let recomendacionService!: StubRecomendacionService
//   let recomendacionIdExistente: number

//   beforeEach(async () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate'])
//     recomendacionService = new StubRecomendacionService
//     const recomendacion = recomendacionService.getListaRecomendaciones()[1]
//     recomendacionIdExistente = recomendacion.id
  
//     const subscribeOk = (f: (value: Params) => void) => {
//       f( {id: recomendacionIdExistente })
//     }

//     await TestBed.configureTestingModule({
//       imports: [NuevaValoracionComponent, RouterModule.forRoot([])],
//       providers: [
//         { provide: Router, useValue: routerSpy },
//         { provide: ActivatedRoute, useValue: {params : {subscribe : subscribeOk}}},
//         { provide: RecomendacionService, useValue: recomendacionService}
//       ]
//     })
//     .compileComponents()
    
//     fixture = TestBed.createComponent(NuevaValoracionComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()
//   })

//   it('should create', () => {
//     expect(component).toBeTruthy()
//   })
// })