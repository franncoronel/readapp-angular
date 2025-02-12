import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

@Injectable({
    providedIn: "root"
})
export class ComunicacionService {
    private eventSource = new Subject<void>()
    event$ = this.eventSource.asObservable()
  
    usuarioActualizado() {
      this.eventSource.next()
    }    
}