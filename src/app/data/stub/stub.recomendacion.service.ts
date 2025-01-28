import { LibroDTO } from "../domain/libro.domain"
import { RecomendacionDTO } from "../domain/recomendacion.domain"

const autor1 = new Autor("Julio", "Cortazar")

export class StubRecomendacionService {
    private libros! : LibroDTO[]
    private recomendaciones! : RecomendacionDTO[]   

    constructor() {
    this.libros = [
        new LibroDTO(13, "El retrato de Dorian Gray", autor1, "portada-retrato-dorian.jpg", 276, 78000, ['INGLES','ESPANIOL'], 1800000,true,false),
        new LibroDTO(12, "Rayuela", autor1, "portada-rayuela.png", 600, 150000, ['ESPANIOL'], 2000000,true,false),
        new LibroDTO(14, "La Odisea", autor1, "portada-odisea.jpg", 540, 120000, ['INGLES','ESPANIOL'], 950000,true,false),
        new LibroDTO(15, "Orgullo y prejuicio", autor1, "portada-orgullo-prejuicio.webp", 432, 135000, ['INGLES','ESPANIOL'], 4200000,true,false)
    ]
    
    this.recomendaciones = [
        new RecomendacionDTO(1, 1,false,10, "Recomendación ciencia ficción", "Es un conjunto de libros re copados que se pueden leer en familia. Muy recomendables para niños", true, this.libros,4,[],1,false),
        new RecomendacionDTO(2, 1,false,10, "Recomendación para las vacaciones", "Es un conjunto de libros re copados que se pueden leer en familia. Muy recomendables para niños", true, this.libros,4,[],1,false)
    ]

    }

    getRecomendacion(id: number){
        return this.recomendaciones.find(it => it.id === id)
    }

    getListaRecomendaciones(){
        return this.recomendaciones
    }
    
    getListaRecomendacionesReducida(lim1: number, lim2: number) {
        return this.recomendaciones.slice(lim1, lim2)
    }

}