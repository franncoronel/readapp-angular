import { Component, HostListener } from '@angular/core'
import { Router } from '@angular/router'
import { BUSQUEDA_LIBROS, LOGIN, MIS_RECOMENDACIONES, PAGINA_PRINCIPAL, PERFIL} from '../../app.routes'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { AuthService } from '../../data/services/auth.service'
import { CommonModule } from '@angular/common'
import { ComunicacionService } from '../../data/services/comunicacion.service'

@Component({
  selector: 'readapp-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public usuario!: Usuario 

  constructor(
    private router: Router,
    private usuarioService:UsuarioService,
    private authService: AuthService,
    private comunicacionService : ComunicacionService
  ) {}

  
  async ngOnInit() {
      this.comunicacionService.event$.subscribe(async () => {
        this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
      })
     this.usuario = await this.usuarioService.obtenerUsuarioLogueado()
  }

  navegarAHome() {
    this.router.navigate([PAGINA_PRINCIPAL])

  }

  navegarABusquedaDeLibros() {
    this.router.navigate([BUSQUEDA_LIBROS])
  }

  navegarAMisRecomendaciones() {
    this.router.navigate([MIS_RECOMENDACIONES])
  }

  navegarAInfoPerfil() {
    this.router.navigate([PERFIL])
  }

  navegarALogin() {
    this.authService.logout()
    this.router.navigate([LOGIN])
  }

  cerrarNav() {
    const checkbox = document.getElementById('navegacion') as HTMLInputElement
    if (checkbox) {
      checkbox.checked = false
    }
  }

  @HostListener('document:click', ['$event'])
  cerrarSiHaceClickFuera(event: Event) {
    const target = event.target as HTMLElement
    const menu = document.getElementById('navegacion') as HTMLInputElement

    if (menu && menu.checked && !target.closest('header')) {
      menu.checked = false
    }
  }
}