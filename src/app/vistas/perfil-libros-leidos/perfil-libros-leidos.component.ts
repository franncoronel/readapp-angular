import { Component } from '@angular/core'
import { Libro } from '../../data/domain/libro.domain'
import { GrillaComponent } from '../../componentes-aislados/grillas/grilla-libros/grilla.component'
import { LibroComponent } from '../../componentes-aislados/tarjeta-libro/libro.component'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { BusquedaLibroService } from '../../data/services/busquedaLibro.service'
import { mostrarError } from '../../data/errores'

@Component({
  selector: 'readapp-vista-perfil-libros-leidos',
  standalone: true,
  imports: [ GrillaComponent, LibroComponent],
  templateUrl: './perfil-libros-leidos.component.html',
  styleUrl: './perfil-libros-leidos.component.css'
})
export class PerfilLibrosLeidosComponent {
  public usuario!: Usuario
  public libros:Libro[] = []
  errores = []

  constructor(private usuarioService:UsuarioService, private busquedaService:BusquedaLibroService) {}

  async cargarUsuario(unUsuario:Usuario) {
    this.usuario = unUsuario
    this.libros = this.usuario.librosLeidos
  }

  hayLibroAgregado(libro:Libro){
    this.usuario.agregarLibroLeido(libro)
    this.agregarLibroLeido(libro)
  }

  hayLibroEliminado(libro:Libro){
    this.usuario.sacarLibroLeido(libro)
    this.eliminarLibroLeido(libro)
  }

  eliminarLibroLeido(libro:Libro) {
    const proceso = this.usuarioService.eliminarLibroLeido(this.usuario.id, libro.id)
    proceso.then(usuarioDTO=>{
      this.libros = usuarioDTO.librosLeidos.map(libroDTO => Libro.fromDTO(libroDTO))
    }).catch(error=> {
      mostrarError(this, error)
    })
  }

  agregarLibroLeido(libro:Libro) {
    const proceso = this.usuarioService.agregarLibroLeido(this.usuario.id, libro.id)
    proceso.then(usuarioDTO=>{
      this.libros = usuarioDTO.librosLeidos.map(libroDTO => Libro.fromDTO(libroDTO))     
    }).catch(error=> {
      mostrarError(this, error)
    })
  }
}
