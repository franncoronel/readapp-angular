import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Libro } from '../../data/domain/libro.domain'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { CartelConfirmacionEliminarComponent } from '../cartel-confirmacion-eliminar/cartel-confirmacion-eliminar.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'readapp-libro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './libro.component.html',
    styleUrl: './libro.component.css'
  })
  export class LibroComponent {
    @Input() libro!: Libro // Este componente se inicializa en el test
    @Input() recomendacion!: Recomendacion
    @Output() libroEliminado = new EventEmitter<Libro>()

    constructor(
      private router: Router,
      private dialog: MatDialog) {}

    idiomasConFormato(idiomas: string[]): string {
      return idiomas.join(' - ')
    }

    estaEditando(): boolean {
      return this.router.url.startsWith('/edicion-recomendacion/') || this.router.url.startsWith('/perfil/libros-leidos') || this.router.url.startsWith('/perfil/libros-a-leer')
    }

    borrar() {
      const dialogRef = this.dialog.open(CartelConfirmacionEliminarComponent, {
        data: {
          titulo : 'ELIMINAR LIBRO',
          subtitulo: '¿Estás seguro de que deseas eliminar este libro?',
        }
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.libroEliminado.emit(this.libro)
        }
      })      
    }

    capturarId() {
      return this.libro.id
    }
}