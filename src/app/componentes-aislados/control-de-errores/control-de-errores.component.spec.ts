import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ControlDeErroresComponent } from './control-de-errores.component'
import { ElementoDeDominio } from '../../data/validacion'

describe('ControlDeErroresComponent', () => {
  let component: ControlDeErroresComponent
  let fixture: ComponentFixture<ControlDeErroresComponent>
  const mockElementoDeDominio : ElementoDeDominio = {
    erroresDe: jasmine.createSpy('erroresDe'),
    tieneErrores: jasmine.createSpy('errorFrom')
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlDeErroresComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(ControlDeErroresComponent)
    component = fixture.componentInstance
    component.elementoDeDominio = mockElementoDeDominio
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
