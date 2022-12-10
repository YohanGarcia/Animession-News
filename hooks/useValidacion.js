import React, { useEffect, useState } from 'react';

const UseValidacion = (stateInicial, validar, fn) => {
    const [valores, guardarVlores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect( () =>{
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); // Fn = función que se ejecuta en el componente
            }
            guardarSubmitForm(false);
        }
    }, [errores])

    // Función que se ejecuta conforme el usuario escribe algo

    const handleChange = e => {
        guardarVlores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erreresValidacion = validar(valores);
        guardarErrores(erreresValidacion);
        guardarSubmitForm(true);
    }

    // Cunado se realiza el evento blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}

export default UseValidacion;
