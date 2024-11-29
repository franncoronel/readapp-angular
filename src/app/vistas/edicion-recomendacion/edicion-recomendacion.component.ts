import { Component } from '@angular/core'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { ActivatedRoute, Router } from '@angular/router'
import { PAGINA_PRINCIPAL } from '../../app.routes'
import { BotonPrimarioComponent } from '../../componentes-aislados/botones/boton-primario/boton-primario.component'
import { BotonSecundarioComponent } from '../../componentes-aislados/botones/boton-secundario/boton-secundario.component'
import { GrillaComponent } from '../../componentes-aislados/grillas/grilla-libros/grilla.component'
import { GrillaValoracionesComponent } from '../../componentes-aislados/grillas/grilla-valoraciones/grilla-valoraciones.component'
import { FormsModule} from '@angular/forms'
import { ControlDeErroresComponent } from '../../componentes-aislados/control-de-errores/control-de-errores.component'
import { CommonModule } from '@angular/common'
import { Libro } from '../../data/domain/libro.domain'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'

@Component({
  selector: 'readapp-edicion-recomendacion',
  standalone: true,
  imports: [GrillaComponent, BotonSecundarioComponent, BotonPrimarioComponent, GrillaValoracionesComponent, FormsModule, ControlDeErroresComponent, CommonModule],
  templateUrl: './edicion-recomendacion.component.html',
  styleUrl: './edicion-recomendacion.component.css'
})
export class EdicionRecomendacionComponent {
  usuario! : Usuario
  recomendacion!: Recomendacion
  recomendacionEdicion!: Recomendacion

  constructor(
    private recomendacionService: RecomendacionService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
    this.route.params.subscribe(async (recomendacionParametros) => {
      const recomendacion = await this.recomendacionService.getRecomendacion(+(recomendacionParametros['id']), this.usuario.id)!
      if (recomendacion) {
        this.recomendacion = recomendacion
        this.recomendacionEdicion = recomendacion.copia(recomendacion)
      } else {
        // AGREGAR MENSAJE DE ERROR
        this.navegarAHome()
      }
    })
  }

  async guardarCambios() {
    const confirmacion = await this.recomendacionService.guardarRecomendacion(this.recomendacionEdicion)
    if(!confirmacion) return
    this.recomendacion.actualizar(this.recomendacionEdicion)    
    /* El método put es llamado dentro de guardarRecomendacion() */
    location.reload()
  }

  cancelar() {
    this.recomendacionEdicion.actualizar(this.recomendacion)
    this.navegarAHome()
  }

  navegarAHome() {
    this.router.navigate([PAGINA_PRINCIPAL])
  }

  actualizarLibros() {
    this.recomendacionEdicion.librosRecomendados = [...this.recomendacionEdicion.librosRecomendados] // Forzamos la actualización creando un nuevo array con los mismos elementos
  }

  hayLibroAgregado(libro:Libro) {
    this.recomendacionEdicion.agregarLibro(libro, this.usuario)
    this.actualizarLibros()
  }

  hayLibroEliminado(libro:Libro) {
    this.recomendacionEdicion.eliminarLibro(libro)
    this.actualizarLibros()
  }
}