import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'readapp-cartel-confirmacion-eliminar',
  standalone: true,
  imports: [],
  templateUrl: './cartel-confirmacion-eliminar.component.html',
  styleUrl: './cartel-confirmacion-eliminar.component.css'
})
export class CartelConfirmacionEliminarComponent {
  constructor(public dialogRef: MatDialogRef<CartelConfirmacionEliminarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { titulo: string , subtitulo : string}) {}

  cancelar(): void {
    this.dialogRef.close(false) // Si aprieta "Cancelar" devuelve `false` no elimina el elemento
  }

  confirmar(): void {
    this.dialogRef.close(true) // Si aprieta "Aceptar" devuelve `true` para continuar con la accion
  }
}