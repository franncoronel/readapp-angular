import { Component } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { HeaderComponent } from "./componentes-aislados/header/header.component"
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'readapp-grupo-10'

  constructor(private router: Router) {}
  
  esVistaLogin(): boolean {
    return this.router.url === "/login"
}
}