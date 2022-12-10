export default function validarIniciarSession(valores) {
    let errores = {};


    // Validar email
    if (!valores.email) {
        errores.email = 'El email indicado es obligatorio.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email) ) {
        errores.email = 'El email valido';
    }

    // Validar el password
    if (!valores.password) {
        errores.password = 'El password es obligatorio';
    } else if (valores.password.length < 6) {
        errores.password = 'El password debe tener 6 caracteres';
        
    }
    return errores;
}