import { Component, Input } from '@angular/core'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { ActivatedRoute, Router } from '@angular/router'
import { PAGINA_PRINCIPAL } from '../../app.routes'
import { GrillaValoracionesComponent } from '../../componentes-aislados/grillas/grilla-valoraciones/grilla-valoraciones.component'
import { BotonSecundarioComponent } from '../../componentes-aislados/botones/boton-secundario/boton-secundario.component'
import { GrillaComponent } from '../../componentes-aislados/grillas/grilla-libros/grilla.component'
import { UsuarioService } from '../../data/services/usuario.service'
import { Usuario } from '../../data/domain/usuario.domain'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'readapp-detalle-recomendacion',
  standalone: true,
  imports: [GrillaComponent, BotonSecundarioComponent, GrillaValoracionesComponent, CommonModule],
  templateUrl: './detalle-recomendacion.component.html',
  styleUrl: './detalle-recomendacion.component.css'
})
export class DetalleRecomendacionComponent {
  @Input() recomendacion!: Recomendacion
  usuario! : Usuario
  puedeValorar! : boolean
  
  constructor(
    private recomendacionService: RecomendacionService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
    this.route.params.subscribe(async (recomendacionParametros) => {
      const recomendacion = await this.recomendacionService.getRecomendacion(+(recomendacionParametros['id']), this.usuario.id)
      if (recomendacion) {
        this.recomendacion = recomendacion
        this.puedeValorar = recomendacion.puedeValorar
      } else {
        // MESAJE DE ERROR
        this.navegarAHome()
      }
    })
  }

  navegarAHome() {
    this.router.navigate([PAGINA_PRINCIPAL])
  }
}
