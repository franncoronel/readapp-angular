import { Injectable } from '@angular/core'
import { Usuario, UsuarioDTO, UsuarioFormularioDTO } from '../domain/usuario.domain'
import { lastValueFrom } from 'rxjs'
import { HttpClient } from "@angular/common/http"
import { URL_SERVIDOR_REST } from "./configuracion"

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) {}

  async obtenerUnUsuario(id: number): Promise<Usuario> {
    const usuario$ = this.httpClient.get<UsuarioDTO>(`${URL_SERVIDOR_REST}/usuarios/${id}`)
    const usuario = await lastValueFrom(usuario$)
    return Usuario.fromDTO(usuario)
  }

  public guardarUsuarioLogueado(usuario : Usuario) {
    sessionStorage.setItem('usuarioLogueado', JSON.stringify(usuario.id))
  }

  async guardarUsuario(usuario: Usuario) { //Este es el metodo a llamar cuando se guarda el usuario
    usuario.validarUsuario()
    if (usuario.errores.length > 0) return
    const recibo = this.actualizarDatosFormulario(usuario)
    recibo.then(usuarioDTO=>{
      console.info("Se actualizó satisfactoriamente el usuario: ",usuarioDTO.nombre)
    }).catch(error=>{
      console.error("No se logro actualizar el usuario",error)
    })
  }

  async actualizarDatosFormulario(usuario:Usuario) : Promise<UsuarioFormularioDTO> {
    const usuarioDTO = usuario.toDTO(usuario)
    console.info(usuarioDTO)
    const proceso = this.httpClient.put<UsuarioFormularioDTO>(`${URL_SERVIDOR_REST}/usuarios/${usuario.id}`,usuarioDTO)
    return lastValueFrom(proceso)
  }

  async agregarLibroALeer(usuarioId: number, libroId : number): Promise<UsuarioDTO> {
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/agregar-libro-a-leer`
    return lastValueFrom(this.httpClient.put<UsuarioDTO>(url, libroId))
  }

  async eliminarLibroALeer(usuarioId: number, libroId : number): Promise<UsuarioDTO> {
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/eliminar-libro-a-leer/${libroId}`
    return lastValueFrom(this.httpClient.delete<UsuarioDTO>(url))
  }

  async agregarLibroLeido(usuarioId: number, libroId : number): Promise<UsuarioDTO> {
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/agregar-libro-leido`
    return lastValueFrom(this.httpClient.put<UsuarioDTO>(url, libroId))
  }

  async eliminarLibroLeido(usuarioId: number, libroId : number): Promise<UsuarioDTO> {
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/eliminar-libro-leido/${libroId}`
    return lastValueFrom(this.httpClient.delete<UsuarioDTO>(url))
  }

  async actualizarAmigos(usuario:Usuario) {
    const usuarioId = usuario.id
    const idAmigos : number[] = usuario.amigos.map(amigo => amigo.id)
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/actualizar-amigos`
    const proceso = this.httpClient.put<UsuarioDTO>(url,idAmigos)
    return lastValueFrom(proceso)
  }

  public async obtenerUsuarioLogueado(): Promise<Usuario> {
    const idUsuario = Number(sessionStorage.getItem('usuarioLogueado')!)
    const datosDelUsuario = await this.obtenerUnUsuario(idUsuario)
    return datosDelUsuario
  }

  actualizarRecomendacionesAValorar (usuario : Usuario) {
    const usuarioId = usuario.id
    const recomendacionesAValorarId = usuario.recomendacionesAValorar.map ((recomendacion) => recomendacion.id)
    const url = `${URL_SERVIDOR_REST}/usuarios/${usuarioId}/actualizar-recomendaciones-a-valorar`
    const proceso = this.httpClient.put<UsuarioDTO>(url,recomendacionesAValorarId)
    return lastValueFrom(proceso)
  }
}