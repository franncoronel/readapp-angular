import { Component } from '@angular/core'
import { Usuario } from '../../data/domain/usuario.domain'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PAGINA_PRINCIPAL } from '../../app.routes'
import { UsuarioService } from '../../data/services/usuario.service'
import { CommonModule } from '@angular/common'
import { BotonPrimarioComponent } from '../../componentes-aislados/botones/boton-primario/boton-primario.component'
import { AuthService } from '../../data/services/auth.service'

@Component({
  selector: 'readapp-login',
  standalone: true,
  imports: [BotonPrimarioComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errorMessage: string = ''

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    if (this.authService.estaLogueado()) {
      this.router.navigate([PAGINA_PRINCIPAL])
  }

}

  usuario: Usuario = new Usuario(1,'Juan','Admin','admin', '12345',new Date(1995,0,1),'admin@gmail.com',10,'Promedio',['Leedor'],[],[],[],"mono.jpg",[],0,0)
  
  passwordVisible: boolean = false

  visibilidadPassword() {
    this.passwordVisible = !this.passwordVisible
  }

  async login() {
    await this.authService.autenticar(this.usuario.username, this.usuario.password).then (
      async (idValido) => {
        const usuario = await this.usuarioService.obtenerUnUsuario(idValido)
        this.usuarioService.guardarUsuarioLogueado(usuario)
        this.router.navigate([PAGINA_PRINCIPAL])
      }
    ).catch( (e) => {
      this.errorMessage = e.error.message
    })      
  }
}