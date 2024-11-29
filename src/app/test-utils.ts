import { ComponentFixture } from "@angular/core/testing"

export const obtenerViaTestId = (appComponent:ComponentFixture<any>, testId: string) => {
    const compiled = appComponent.debugElement.nativeElement
    return compiled.querySelector(`[data-testid=${testId}`)
}
export const obtenerHtmlCompleto = (appComponent:ComponentFixture<any>) => {
    return appComponent.debugElement.nativeElement
}