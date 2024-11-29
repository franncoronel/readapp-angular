import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { URL_SERVIDOR_REST } from './configuracion'
import { lastValueFrom } from 'rxjs'
import { UsuarioValidacionDTO } from '../domain/usuario.domain'

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
  
    constructor(private http: HttpClient) {}

    async autenticar(username: string, password: string): Promise<number>{
        const credencialesValidas = await this.verificarCredenciales(username, password)
        return credencialesValidas.id
    }

    async verificarCredenciales(username: string, password: string): Promise<UsuarioValidacionDTO> {
        const data = { username, password }
        return await lastValueFrom(this.http.post<Promise<UsuarioValidacionDTO>>(`${URL_SERVIDOR_REST}/autenticacion`, data))
    }
    
    estaLogueado(): boolean {
      return !!sessionStorage.getItem('usuarioLogueado')
    }
    
    logout(): void {
      sessionStorage.removeItem('usuarioLogueado')
    }
  }
