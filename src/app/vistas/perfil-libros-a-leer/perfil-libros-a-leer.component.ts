import { Component } from '@angular/core'
import { Libro } from '../../data/domain/libro.domain'
import { GrillaComponent } from '../../componentes-aislados/grillas/grilla-libros/grilla.component'
import { LibroComponent } from '../../componentes-aislados/tarjeta-libro/libro.component'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { mostrarError } from '../../data/errores'

@Component({
  selector: 'readapp-vista-perfil-libros-a-leer',
  standalone: true,
  imports: [GrillaComponent,LibroComponent],
  templateUrl: './perfil-libros-a-leer.component.html',
  styleUrl: './perfil-libros-a-leer.component.css'
})
export class PerfilLibrosALeerComponent {
  public usuario!: Usuario
  public libros! : Libro[]
  errores = []

  constructor (private usuarioService : UsuarioService) {}

  async cargarUsuario(unUsuario:Usuario) {
    this.usuario = unUsuario
    this.libros = this.usuario.librosALeer
  }

  hayLibroAgregado(libro:Libro){
    this.usuario.agregarLibroALeer(libro)
    this.agregarLibrosALeer(libro)
  }

  hayLibroEliminado(libro:Libro){
    this.usuario.sacarLibroALeer(libro)
    this.eliminarLibroALeer(libro)
  }

  eliminarLibroALeer(libro:Libro) {
    const proceso = this.usuarioService.eliminarLibroALeer(this.usuario.id, libro.id)
    proceso.then(usuarioDTO=>{
      this.libros = usuarioDTO.librosALeer.map(libroDTO => Libro.fromDTO(libroDTO))
    }).catch(error=> {
      mostrarError(this, error)
    })
  }

  agregarLibrosALeer(libro:Libro) {
    const proceso = this.usuarioService.agregarLibroALeer(this.usuario.id, libro.id)
    proceso.then(usuarioDTO=>{
      this.libros = usuarioDTO.librosALeer.map(libroDTO => Libro.fromDTO(libroDTO))
    }).catch(error=> {
      mostrarError(this, error)
    })
  }
}