export default function validarCrearCategoria(valores) {
    let errores = {};

    // Validar el Nombre
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio.';
    }

    
    return errores;
}