import { ComponentFixture, TestBed } from '@angular/core/testing'
import { TarjetaAmigoComponent } from './tarjeta-amigo.component'
import { AmigoDTO } from '../../data/domain/usuario.domain'

describe('TarjetaAmigoComponent', () => {
  let component: TarjetaAmigoComponent
  let fixture: ComponentFixture<TarjetaAmigoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaAmigoComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(TarjetaAmigoComponent)
    component = fixture.componentInstance
    component.amigo = new AmigoDTO(1,"Wes","Craven","elmstreet","mono.png")
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
