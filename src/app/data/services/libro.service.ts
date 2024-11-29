import {Injectable} from "@angular/core"
import {Libro, LibroDTO} from "../domain/libro.domain"
// import { librosMockProveedor } from "../../mocks/MockProvider"
import { HttpClient } from "@angular/common/http"
import { URL_SERVIDOR_REST } from "./configuracion"
import { lastValueFrom } from "rxjs"
@Injectable({
    providedIn: "root"
})
export class LibroService {

    constructor(private httpClient: HttpClient){}

    async obtenerTodos() {
        const libros$ = this.httpClient.get<LibroDTO[]>(URL_SERVIDOR_REST + '/libros')
        const libros = await lastValueFrom(libros$)
        return libros.map((libroDTO) => Libro.fromDTO(libroDTO))
    }
    
    async obtenerPorId(id: number){
        const libro$ = this.httpClient.get<LibroDTO>(URL_SERVIDOR_REST + `/libros/${id}`)
        const libro = await lastValueFrom(libro$)
        return Libro.fromDTO(libro)
    }
}