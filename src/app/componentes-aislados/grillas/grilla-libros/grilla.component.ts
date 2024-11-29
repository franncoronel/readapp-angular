import { EventEmitter, Input, Output } from '@angular/core'
import { Component } from '@angular/core'
import { BotonComponent} from '../../botones/boton-agregar/boton.component'
import { LibroComponent } from '../../tarjeta-libro/libro.component'
import { Libro } from '../../../data/domain/libro.domain'
import { LibroPipe } from "../../../data/libro.pipe"
import { Router } from '@angular/router'
import { BUSQUEDA_LIBROS } from '../../../app.routes'
import { BusquedaLibroService } from '../../../data/services/busquedaLibro.service'
import { CommonModule } from '@angular/common'

export type value = number | string

@Component({
  selector: 'readapp-grilla',
  standalone: true,
  imports: [LibroComponent, BotonComponent, LibroPipe, CommonModule],
  templateUrl: './grilla.component.html',
  styleUrl: './grilla.component.css'
})
export class GrillaComponent {
  @Input() libros!:Libro[]
  @Input() filtroBusqueda!:string //Después de todo el pasamanos desde la barra de búsqueda, el texto ingresado en ella se deposita acá.
  @Output() libroEliminado = new EventEmitter<Libro>() // Evento para propagar hacia el padre
  @Output() libroAgregado = new EventEmitter<Libro>() // Evento para propagar hacia el padre
  @Output() libroSeleccionado=new EventEmitter<Libro>()
  @Input() mostrarBoton : boolean = false


  constructor(private router:Router, private busquedaService : BusquedaLibroService){}

  elegirLibro(libro:Libro) {
    this.libroSeleccionado.emit(libro)
  }

  async buscarLibro(){
    localStorage.setItem("regresarDeBusqueda",this.router.url)
    this.busquedaService.designarDestino(this)
    this.router.navigate([BUSQUEDA_LIBROS])
  }

    // Este método recibe el evento emitido por `LibroComponent` y lo re-emite hacia las vistas de librosLeidos/Leer/EdicionRecomendacion
  hayLibroEliminado(libro: Libro) {
    this.libroEliminado.emit(libro)
  }

}