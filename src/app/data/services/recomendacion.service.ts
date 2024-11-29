import {Injectable} from "@angular/core"
import { Recomendacion, RecomendacionDTO } from "../domain/recomendacion.domain"
import { ValoracionService } from "./valoracion.service"
import { HttpClient } from "@angular/common/http"
import { URL_SERVIDOR_REST } from "./configuracion"
import { lastValueFrom } from "rxjs"
import { NuevaValoracionDTO, Valoracion } from "../domain/valoracion.domain"

@Injectable({
    providedIn: "root"
})
export class RecomendacionService {
    
    constructor(private httpClient:HttpClient, private valoracionService:ValoracionService){
    }

    async getRecomendacion(id:number, idUsuario : number){
        const recomendacion$ = this.httpClient.get<RecomendacionDTO>(`${URL_SERVIDOR_REST}/recomendaciones/${id}/${idUsuario}`)
        const recomendacion = await lastValueFrom(recomendacion$)
        return Recomendacion.fromDTO(recomendacion)
    }

    async getListaRecomendaciones(idUsuarioLogueado : number){
        const recomendaciones$ = this.httpClient.get<RecomendacionDTO[]>(`${URL_SERVIDOR_REST}/recomendaciones/${idUsuarioLogueado}/usuario`)
        const recomendaciones = await lastValueFrom(recomendaciones$)
        return recomendaciones.map ( recomendacionDTO => Recomendacion.fromDTO(recomendacionDTO))
    }

    async getListaRecomendacionesPorCriterio (idUsuarioLogueado : number){
        const recomendaciones$ = this.httpClient.get<RecomendacionDTO[]>(`${URL_SERVIDOR_REST}/recomendaciones/${idUsuarioLogueado}/usuario-criterio`)
        const recomendaciones = await lastValueFrom(recomendaciones$)
        return recomendaciones.map ( recomendacionDTO => Recomendacion.fromDTO(recomendacionDTO))
    }

    async getListaRecomendacionesUsuario (idUsuarioLogueado : number){
        const recomendaciones$ = this.httpClient.get<RecomendacionDTO[]>(`${URL_SERVIDOR_REST}/recomendaciones/${idUsuarioLogueado}/usuario-logueado`)
        const recomendaciones = await lastValueFrom(recomendaciones$)
        return recomendaciones.map ( recomendacionDTO => Recomendacion.fromDTO(recomendacionDTO))
    }

    async guardarRecomendacion(recomendacion: Recomendacion) : Promise<boolean> { //Devuelve true si la operacion fue exitosa
        recomendacion.validarRecomendacion()
        if (recomendacion.errores.length > 0) return false
        await this.actualizarRecomendacion(recomendacion)
        return true
      }
    
    async actualizarRecomendacion(recomendacion: Recomendacion) {
        const idRecomendacion = recomendacion.id
        const edicionRecomendacionDTO = Recomendacion.toDTOEdicionRecomendacion(recomendacion)
        return await lastValueFrom(
          this.httpClient.put<void>(`${URL_SERVIDOR_REST}/recomendaciones/${idRecomendacion}`, edicionRecomendacionDTO)
        )
    }

    async borrarRecomendacion(recomendacion: Recomendacion) {
        const idRecomendacion = recomendacion.id
        return this.httpClient.delete<RecomendacionDTO>(`${URL_SERVIDOR_REST}/recomendaciones/${idRecomendacion}`)
    }

    async guardarValoracion(valoracion: Valoracion,recomendacion:Recomendacion) {
        const idRecomendacion = recomendacion.id
        const guardarValoracion$ = this.httpClient.put<NuevaValoracionDTO>(`${URL_SERVIDOR_REST}/recomendaciones/${idRecomendacion}/nueva-valoracion`,NuevaValoracionDTO.toDTO(valoracion))
        return await lastValueFrom(guardarValoracion$)
    }

}