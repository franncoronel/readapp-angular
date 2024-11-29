import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Recomendacion } from '../../data/domain/recomendacion.domain'
import { Router, RouterLink } from '@angular/router'
import { Usuario } from '../../data/domain/usuario.domain'
import { UsuarioService } from '../../data/services/usuario.service'
import { RecomendacionService } from '../../data/services/recomendacion.service'
import { MatDialog } from '@angular/material/dialog'
import { CartelConfirmacionEliminarComponent } from '../cartel-confirmacion-eliminar/cartel-confirmacion-eliminar.component'

@Component({
  selector: 'readapp-tarjeta-recomendacion',
  standalone: true,
  imports: [CommonModule, RouterLink, CommonModule],
  templateUrl: './tarjeta-recomendacion.component.html',
  styleUrl: './tarjeta-recomendacion.component.css'
})
export class TarjetaRecomendacionComponent {
  @Input() recomendacion!: Recomendacion
  @Output() recomendacionEliminada = new EventEmitter<Recomendacion>()
  @Input() usuario!:Usuario
  iconoCorazon! : boolean
  corazonVacio! : boolean
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private recomendacionService: RecomendacionService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.iconoCorazon = this.recomendacion.puedeValorar
    this.corazonVacio = !this.usuario.yaEstaParaValorar(this.recomendacion)
  }  

  public cantidadLibros(): number {
    return this.recomendacion.librosRecomendados.length
  }

  estaValorando() {
    return this.router.url.startsWith('/nueva-valoracion/')
  }
  
  //Este metodo corrobora si la recomendacion esta en la lista a valorar o no y en base a eso toma diferentes acciones
  async recomendacionAValorar() {
    if (!this.usuario.yaEstaParaValorar(this.recomendacion)) {
      this.usuario.agregarRecomendacionAValorar(this.recomendacion)      
      this.corazonVacio = !this.corazonVacio      
    } else {
      this.usuario.sacarRecomendacionAValorar(this.recomendacion)
      this.corazonVacio = !this.corazonVacio
    }
    await this.usuarioService.actualizarRecomendacionesAValorar(this.usuario)
  }
  
  eliminarRecomendacion() {
    const dialogRef = this.dialog.open(CartelConfirmacionEliminarComponent, {
      data: {
        titulo : 'ELIMINAR RECOMENDACIÓN',
        subtitulo: '¿Estás seguro de que deseas eliminar esta recomendación? Esta acción es irreversible.',
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar()
        this.recomendacionEliminada.emit(this.recomendacion)
      }
    })      
  }

  async eliminar() {    
    const proceso = await this.recomendacionService.borrarRecomendacion(this.recomendacion)
    proceso.subscribe({
      next: data => {
          console.info("Proceso exitoso",data)
      },
      error: error => {
          console.error('¡Se rompio todo!', error)
      }})
  }

}