export default function validarCrearNoticia(valores) {
    let errores = {};

    // Validar el titulo
    if (!valores.titulo) {
        errores.titulo = 'El titulo es obligatorio.';
    }

    // Validar contenido
    if (!valores.posts1) {
        errores.posts1 = 'El contenido es obligatorio.';
    }

    // Validar Imagen
    // if (!valores.imagen1) {
    //     errores.imagen1 = 'El imagen es obligatorio.';
    // }
    return errores;
}