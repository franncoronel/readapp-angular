import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { PERFIL_AMIGOS, PERFIL_INFORMACION, PERFIL_LIBROS_A_LEER, PERFIL_LIBROS_LEIDOS, PERFIL_RECOMENDACIONES_A_VALORAR } from '../../app.routes'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { CommonModule, NgClass } from '@angular/common'
import { ComunicacionService } from '../../data/services/comunicacion.service'

@Component({
  selector: 'readapp-aside-perfil',
  standalone: true,
  imports: [NgClass,CommonModule],
  templateUrl: './aside-perfil.component.html',
  styleUrl: './aside-perfil.component.css'
})
export class AsidePerfilComponent {
  urlActual!: string
  public usuario! : Usuario
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private usuarioService:UsuarioService,
    private comunicacionService : ComunicacionService
  ) {
    this.router.events.subscribe(() => {
      this.urlActual = this.router.url
    })
  }

  async ngOnInit() {
    this.comunicacionService.event$.subscribe(async () => {
      this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
    })
    this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
  }

  estaActiva(ruta:string): boolean{
    return this.urlActual === ruta
  }

  navegarInfo(){
    this.router.navigate([PERFIL_INFORMACION], {relativeTo:this.route})
  }

  navegarAmigos(){
    this.router.navigate([PERFIL_AMIGOS], {relativeTo:this.route})
  }
  navegarLibrosLeidos(){
    this.router.navigate([PERFIL_LIBROS_LEIDOS], {relativeTo:this.route})
  }
  navegarLibrosALeer(){
    this.router.navigate([PERFIL_LIBROS_A_LEER], {relativeTo:this.route})
  }
  navegarRecomendacionesAValorar(){
    this.router.navigate([PERFIL_RECOMENDACIONES_A_VALORAR], {relativeTo:this.route})    
  }
}
