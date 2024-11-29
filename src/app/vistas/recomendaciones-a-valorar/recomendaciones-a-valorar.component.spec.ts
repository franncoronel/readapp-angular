import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RecomendacionesAValorarComponent } from './recomendaciones-a-valorar.component'
import { usuarioConRecomendaciones } from '../../mocks/MockProvider'

describe('RecomendacionesAValorarComponent', () => {
  let component: RecomendacionesAValorarComponent
  let fixture: ComponentFixture<RecomendacionesAValorarComponent>
  const usuarioLogueado = usuarioConRecomendaciones

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendacionesAValorarComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(RecomendacionesAValorarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  
  it("deberia cargar las recomendaciones del usuario logueado", async ()=>{
    component.cargarUsuario(usuarioLogueado)
    expect(component.recomendaciones).toBe(usuarioLogueado.recomendacionesAValorar)
  })
})
