import { recomendacionPrivada, recomendacionPublica } from "../mocks/MockProvider"
import { RecomendacionPrivadaPipe } from "./recomendacion.pipe"

const recomendaciones = [recomendacionPrivada, recomendacionPublica]

describe('RecomendacionPipe', () => {
    const pipe = new RecomendacionPrivadaPipe()
    it('crea una instancia', () => {
      expect(pipe).toBeTruthy()
    })
    it('devuelve la lista original si no se ingresa ningun parametro', () => {
      const recomendacionesFiltradas = pipe.transform(recomendaciones)
      expect(recomendacionesFiltradas.length).toBe(2)
    })
    it('devuelve la lista original si recibe false como parametro', () => {
      const recomendacionesFiltradas = pipe.transform(recomendaciones, false)
      expect(recomendacionesFiltradas.length).toBe(2)
    })
    it('devuelve una lista con solo las recomendaciones privadas de recibir true como parametro', () => {
      const recomendacionesFiltradas = pipe.transform(recomendaciones, true)
      expect(recomendacionesFiltradas.length).toBe(1)
      expect(recomendacionesFiltradas).toContain(recomendacionPrivada)
      expect(recomendacionesFiltradas).not.toContain(recomendacionPublica)
    })
  })