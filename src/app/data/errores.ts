export function mostrarError(component: any, error: any): void {
    const originalError = error.error ?? error
    const errorMessage = originalError.message
    
    component.errores.push(errorMessage)
    setTimeout(() => {
        component.errores.length = 0
    }, 7000)
}
