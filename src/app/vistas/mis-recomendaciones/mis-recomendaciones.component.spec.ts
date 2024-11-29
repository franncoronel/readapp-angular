// import { ComponentFixture, TestBed } from '@angular/core/testing'
// import { MisRecomendacionesComponent } from './mis-recomendaciones.component'
// import { RouterModule } from '@angular/router'
// import { recomendacionPrivada, recomendacionPublica, usuarioConRecomendaciones } from '../../mocks/MockProvider'
// import { BarraBusquedaFiltroComponent } from '../../componentes-aislados/barra-busqueda-filtro/barra-busqueda-filtro.component'
// import { GrillaRecomendacionesComponent } from '../../componentes-aislados/grillas/grilla-recomendaciones/grilla-recomendaciones.component'
// import { By } from '@angular/platform-browser'
// import { HttpClient } from '@angular/common/http'
// import { obtenerHttpClientSpy } from '../../data/services/http-client-spy.service'
// import { UsuarioService } from '../../data/services/usuario.service'
// import { RecomendacionService } from '../../data/services/recomendacion.service'

// describe('MisRecomendacionesComponent', () => {
//   let component: MisRecomendacionesComponent
//   let fixture: ComponentFixture<MisRecomendacionesComponent>
//   let httpClientSpy: jasmine.SpyObj<HttpClient>
//   let mockUsuarioService: jasmine.SpyObj<UsuarioService> 
//   let mockRecomendacionService: jasmine.SpyObj<RecomendacionService> 

//   beforeEach(async () => {
//     httpClientSpy = obtenerHttpClientSpy()
//     mockUsuarioService = jasmine.createSpyObj('UsuarioService',['obtenerUsuarioLogueado'])
//     mockRecomendacionService = jasmine.createSpyObj('RecomendacionService',['getListaRecomendaciones'])

//     await TestBed.configureTestingModule({
//       imports: [MisRecomendacionesComponent, RouterModule.forRoot([]), BarraBusquedaFiltroComponent, GrillaRecomendacionesComponent],
//       providers: [
//         { provide: HttpClient, useValue: httpClientSpy },
//         { provide: UsuarioService, useValue: mockUsuarioService },
//         { provide: RecomendacionService, useValue: mockRecomendacionService }
//       ]
//     })
//     .compileComponents()
//     fixture = TestBed.createComponent(MisRecomendacionesComponent)
//     component = fixture.componentInstance
//     fixture.detectChanges()
//   })

//   it('should create', () => {
//     expect(component).toBeTruthy()
//   })

//   it('Deberia sincronizar el evento detectado desde el checkbox del filtro hasta la grilla', async () => {
//     await sincronizarUsuarioLogueado()
//     const barraBusquedaComponent = fixture.debugElement.query(By.directive(BarraBusquedaFiltroComponent)).componentInstance
//     barraBusquedaComponent.ocultarPrivadas.emit(true)
//     fixture.detectChanges()
//     expect(component.filtroBusqueda).toBeTrue()
//     const grillaRecomendacionesComponent = fixture.debugElement.query(By.directive(GrillaRecomendacionesComponent)).componentInstance
//     expect(grillaRecomendacionesComponent.mostrarSoloPrivadas).toBeTrue()
//   })

//   async function sincronizarUsuarioLogueado() {
//     mockUsuarioService.obtenerUsuarioLogueado.and.returnValue(Promise.resolve(usuarioConRecomendaciones))
//     mockRecomendacionService.getListaRecomendaciones.and.returnValue(Promise.resolve([recomendacionPrivada,recomendacionPublica]))
//     await component.ngOnInit()
//     fixture.detectChanges()
// }
// })
