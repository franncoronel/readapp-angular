import { BusquedaPrincipalPipe } from "./busqueda-principal.pipe"
import { Recomendacion } from "./domain/recomendacion.domain"

    const comedia = new Recomendacion(1,2,true,111,"Comedia","divertido",true,[],1,[],4,true)
    const terror = new Recomendacion(2,3,true,111,"Terror","divertido",true,[],1,[],4,true)
    const recomendaciones = [comedia,terror]

describe('BusquedaPrincipalPipe', () => {
  const pipe = new BusquedaPrincipalPipe()

  it('crea una instancia', () => {
    expect(pipe).toBeTruthy()
  })

  it('devuelve la lista original si no se ingresa un parámetro de búsqueda', () => {
    const recomendacionesFiltradas = pipe.transform(recomendaciones)
    expect(recomendacionesFiltradas.length).toBe(2)
  })

  it('devuelve la recomendacion cuyo título corresponde al parámetro ingresado', () => {
    const listaRayuela = pipe.transform(recomendaciones, "COM")
    expect(listaRayuela.length).toBe(1)
    expect(listaRayuela).toContain(comedia)
  })   
})
