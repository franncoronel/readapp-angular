import { ComponentFixture, TestBed } from '@angular/core/testing'
import { CartelConfirmacionEliminarComponent } from './cartel-confirmacion-eliminar.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

describe('CartelConfirmacionEliminarComponent', () => {
  let component: CartelConfirmacionEliminarComponent
  let fixture: ComponentFixture<CartelConfirmacionEliminarComponent>
  let modalMock: MatDialogRef<CartelConfirmacionEliminarComponent>

  beforeEach(async () => {
    modalMock = jasmine.createSpyObj('MatDialogRef', ['close'])

    await TestBed.configureTestingModule({
      imports: [CartelConfirmacionEliminarComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { titulo: 'Eliminar libro', subtitulo: '¿Estás seguro?' } },
        { provide: MatDialogRef, useValue: modalMock }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(CartelConfirmacionEliminarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('se crea correctamente', () => {
    expect(component).toBeTruthy()
  })

  it('al apretar cancelar en el modal debe retornar falso', () => {
    component.cancelar()
    expect(modalMock.close).toHaveBeenCalledWith(false)
  })

  it('al apretar cancelar en el modal debe retornar verdadero', () => {
    component.confirmar()
    expect(modalMock.close).toHaveBeenCalledWith(true)
  })

  it('Los datos recibidos por MAT_DIALOG_DATA llegan correctamente', () => {
    expect(component.data.titulo).toBe('Eliminar libro')
    expect(component.data.subtitulo).toBe('¿Estás seguro?')
  })
})
