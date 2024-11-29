import { Injectable } from "@angular/core"
import { Libro } from "../domain/libro.domain"
import { GrillaComponent } from "../../componentes-aislados/grillas/grilla-libros/grilla.component"

@Injectable({
    providedIn: 'root'
  })

  export class BusquedaLibroService {
    public coleccionDeLibros! : GrillaComponent | null
  
    designarDestino(destino : GrillaComponent) {
        this.coleccionDeLibros = destino        
    }
  
    cargarLibro(libro:Libro) {
        this.coleccionDeLibros!.libroAgregado.emit(libro)
        this.coleccionDeLibros = null
    }
}
  