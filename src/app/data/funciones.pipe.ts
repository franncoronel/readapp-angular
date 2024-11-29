export  function coincideConFiltro(texto: string, filtroBusqueda: string) {
    return texto.toLowerCase().includes(filtroBusqueda.toLowerCase()) //Es importante pasar los títulos a minúsucula o mayúsucla porque includes() distingue entre mayúsuculas y minúsculas.
  }