import { Component } from '@angular/core'
import { TarjetaRecomendacionComponent } from "../../componentes-aislados/tarjeta-recomendacion/tarjeta-recomendacion.component"
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { PAGINA_PRINCIPAL } from '../../app.routes'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BotonPrimarioComponent } from '../../componentes-aislados/botones/boton-primario/boton-primario.component'
import { BotonSecundarioComponent } from '../../componentes-aislados/botones/boton-secundario/boton-secundario.component'
import { Valoracion } from '../../data/domain/valoracion.domain'
import { FormsModule } from '@angular/forms'
import { CommonModule, Location } from '@angular/common'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { ControlDeErroresComponent } from '../../componentes-aislados/control-de-errores/control-de-errores.component'
import { ValoracionService } from '../../data/services/valoracion.service'

@Component({
  selector: 'readapp-nueva-valoracion',
  standalone: true,
  imports: [CommonModule,TarjetaRecomendacionComponent,BotonPrimarioComponent, BotonSecundarioComponent, FormsModule,ControlDeErroresComponent],
  templateUrl: './nueva-valoracion.component.html',
  styleUrl: './nueva-valoracion.component.css'
})
export class NuevaValoracionComponent {
  recomendacion!: Recomendacion
  usuario! : Usuario

  valoracion! : Valoracion

  constructor (
    private valoracionService : ValoracionService,
    private recomendacionService: RecomendacionService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
    this.route.params.subscribe(async (recomendacionParametros) => {
      const recomendacion = await this.recomendacionService.getRecomendacion(+(recomendacionParametros['id']), this.usuario.id)!
      if (recomendacion) {
        this.recomendacion = recomendacion
        this.valoracion = new Valoracion( 1,
                                          "",
                                          this.usuario.nombre,
                                          this.usuario.apellido,
                                          this.usuario.username,
                                          this.usuario.foto,
                                          this.usuario.id,
                                          new Date())
      } else {
        // MESAJE DE ERROR
        this.navegarAHome()
      }
    })
}

async enviarValoracion() {
  const confirmacion = await this.valoracionService.guardarValoracion(this.valoracion)
  if(!confirmacion) return
  this.recomendacion.agregarValoracion(this.valoracion)
  await this.recomendacionService.guardarValoracion(this.valoracion,this.recomendacion)
  this.regresarAtras()
}

regresarAtras() {
  this.router.navigate(['/detalle-recomendacion', this.recomendacion.id])
}

navegarAHome() {
  this.router.navigate([PAGINA_PRINCIPAL])
}

}