import { Component, ViewChild } from '@angular/core'
import { BarraDeBusquedaComponent } from '../../componentes-aislados/barra-de-busqueda/barra-de-busqueda.component'
import { LibroComponent } from '../../componentes-aislados/tarjeta-libro/libro.component'
import { Libro } from '../../data/domain/libro.domain'
import { LibroService } from '../../data/services/libro.service'
import { GrillaComponent } from '../../componentes-aislados/grillas/grilla-libros/grilla.component'
import { Router } from '@angular/router'
import { BusquedaLibroService } from '../../data/services/busquedaLibro.service'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-busqueda-de-libros',
  standalone: true,
  imports: [GrillaComponent,BarraDeBusquedaComponent, LibroComponent, CommonModule],
  templateUrl: './busqueda-de-libros.component.html',
  styleUrl: './busqueda-de-libros.component.css'
})
export class BusquedaDeLibrosComponent {
  libroSeleccionado!:Libro
  public libros! : Libro[]
  filtroBusqueda: string = ""
  @ViewChild("grillaLibro") private grillaLibro!:GrillaComponent /* Busca a un elemento hijo con la referencia grillaLibro */
  libroDestino!: Libro[] | null

  constructor(public libroService:LibroService, private router:Router, private busquedaService : BusquedaLibroService){}

  async ngOnInit() {
    this.libros = await this.libroService.obtenerTodos()
    if (this.busquedaService.coleccionDeLibros) {
      this.libroDestino = this.busquedaService.coleccionDeLibros.libros
      this.libros = this.libros.filter(libro => !this.libroDestino!.find(libroDestino => libroDestino.id == libro.id))
    }
  }

  crearFiltroBusqueda(nuevaBusqueda: string){
    this.filtroBusqueda = nuevaBusqueda
  }
 
  async capturarLibro(libro:Libro) {
    const destino = localStorage.getItem("regresarDeBusqueda")
    this.router.navigate([destino])
    localStorage.removeItem("regresarDeBusqueda")
    this.busquedaService.cargarLibro(libro)
  }
}
