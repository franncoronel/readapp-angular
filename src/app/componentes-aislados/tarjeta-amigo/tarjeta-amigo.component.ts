import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AmigoDTO } from '../../data/domain/usuario.domain'
import { CommonModule } from '@angular/common'
import { CartelConfirmacionEliminarComponent } from '../cartel-confirmacion-eliminar/cartel-confirmacion-eliminar.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'readapp-tarjeta-amigo',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './tarjeta-amigo.component.html',
  styleUrl: './tarjeta-amigo.component.css'
})
export class TarjetaAmigoComponent {
  @Input() amigo!: AmigoDTO
  @Output() amigoAEliminar = new EventEmitter<AmigoDTO>()

  constructor(private dialog: MatDialog) {}

  eliminarAmigo() {
    const dialogRef = this.dialog.open(CartelConfirmacionEliminarComponent, {
      data: {
        titulo : 'ELIMINAR AMIGO',
        subtitulo: '¿Estás seguro de que deseas eliminar este usuario de tu lista de amigos?',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.amigoAEliminar.emit(this.amigo)
      }
    })      
  }
}
