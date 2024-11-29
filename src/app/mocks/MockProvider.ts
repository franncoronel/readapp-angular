//Aca estan todos los materiales para los tests
import { Libro } from "../data/domain/libro.domain"
import { Recomendacion } from "../data/domain/recomendacion.domain"
import { Valoracion } from "../data/domain/valoracion.domain"
import { Usuario } from "../data/domain/usuario.domain" 

export const libroConUnSoloIdioma = new Libro(1, "Rashomon", "Ryuunosuke Akutagawa", "portada-rashomon.jpg", 196, 200000, ['JAPONÉS'], 24690, true, false)
export const libroConMuchosIdiomas = new Libro(2, "Crepusculo", "Stephanie Meyer", "portada-crepusculo.jpg", 500, 430000, ['INGLÉS', 'ESPAÑOL','RUSO'], 8555555, false, true)
export const libroNoDesafianteNoBestSeller = new Libro(3, "Paciente 130", "Marisol San Román", "tapa-libro.jpg", 200, 10000, ['ESPAÑOL'], 5, false, false)
export const libroDesafianteYBestSeller = new Libro(4, "Ulises", "James Joyce", "portada-ulises.webp", 732, 265000, ['INGLÉS', 'ESPAÑOL','Alemán'], 400000, true, true)

export const valoracionPositiva = new Valoracion(5,"tremenda reco","Juan","Admin","admin","mono.png",1,new Date())
export const valoracionNegativa = new Valoracion(1,"terrible reco","Juan","Admin","admin","mono.png",1,new Date())

export const recomendacionPublica = new Recomendacion(1,1,true,100,"Recomendacion Publica","recomendación sobre cosas que me gustaron", true, [libroConUnSoloIdioma,libroConMuchosIdiomas],2,[valoracionPositiva],2,true)
export const recomendacionPrivada = new Recomendacion(2,5,false,100,"Recomendacion Privada","recomendación sobre cosas que detesto", false, [libroConUnSoloIdioma],1,[],1,false)
export const recomendacionConValoracion = new Recomendacion(3,1,true,100,"Recomendacion Valorada","recomendación con valoraciones", true, [],0,[valoracionPositiva,valoracionNegativa],1,false)


export const usuarioConRecomendaciones = new Usuario(1,'Juan','Admin','admin','12345',new Date(),"admin@gmail",10,'Ansioso',['Leedor'],[recomendacionConValoracion,recomendacionPrivada,recomendacionPublica],[],[],"mono.png",[],0,0)
export const usuarioConAmigo = new Usuario(2,'Juan','Admin','admin','12345',new Date(),"admin@gmail",10,'Ansioso',['Leedor'],[],[],[libroConMuchosIdiomas],"mono.png",[usuarioConRecomendaciones],0,0)