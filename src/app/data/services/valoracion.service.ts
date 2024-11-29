import { Injectable } from "@angular/core"
import { Valoracion } from "../domain/valoracion.domain"

@Injectable({
    providedIn: "root"
})
export class ValoracionService {
    private valoraciones!:Valoracion[]
    
    async guardarValoracion(valoracion: Valoracion) : Promise<boolean> { //Devuelve true si la operacion fue exitosa
        valoracion.validarValoracion()
        if (valoracion.errores.length > 0) return false
        return true
      }
    
}

  
  
  