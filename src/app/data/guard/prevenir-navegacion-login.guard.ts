import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class prevenirNavegacionLoginGuard implements CanDeactivate<any> {

  canDeactivate(component: any): boolean | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true
  }
}