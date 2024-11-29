import { Usuario, UsuarioFormularioDTO } from "./usuario.domain"

describe('Usuario', () => {
    let usuario: Usuario
  
    beforeEach(() => {
      usuario = new Usuario(1,"Charly","Garcia","charly-g","pubisangelical",new Date(),"charly@garcia",90,"Recurrente",["Leedor"],[],[],[],"mono.png",[],0,0)
    })

    it('Debería transformar en DTO',()=>{
        const usuarioDTO = usuario.toDTO(usuario)
        expect(usuarioDTO).toBeInstanceOf(UsuarioFormularioDTO)
    })
  
    it('Debería agregar errores si el campo es invalido',()=>{
        usuario.nombre = ""
        usuario.apellido = ""
        usuario.username = ""
        usuario.validarUsuario()
        expect(usuario.errores.length).toBeGreaterThan(0)
        expect(usuario.tieneErrores('Nombre')).toBe(true)
        expect(usuario.tieneErrores('Apellido')).toBe(true)
        expect(usuario.tieneErrores('Username')).toBe(true)      
    })

    it('La fecha se transforma al formato apropiado',()=>{
        usuario.fechaNacimiento = new Date(2004, 5,25) //Los meses empiezan de 0 a 11, por lo que 5 equivale a Junio
        expect(usuario.transformarFechaAString()).toBe("25/06/2004")
    })
  })
  