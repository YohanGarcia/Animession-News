import React, { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import { FirebaseContext } from '../../firebase';
import { useRouter } from 'next/router';
import useValidacion from '../../hooks/useValidacion';
import validarCrearCategoria from '../../validacion/validarCrearCategoria';
import Link from 'next/link';

const STATE_INICIAL = {
    nombre: ''
}

const SubCategoria = () => {
    const router = useRouter();
    const { usuario, firebase } = useContext(FirebaseContext)

    const [error, setError] = useState('')

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(
        STATE_INICIAL, validarCrearCategoria, crearCategoria)
    const { nombre } = valores;

    const notify = () => toast.success("Categoria enviada!", {
        position: 'top-right',
        duration: 3000,
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#fff',
            secondary: '#000',
        },
    });


    async function crearCategoria() {
        // crear el objeto de registrar la categoria
        const categoria = {
            nombre,
            creado: Date.now()
        }
        //  insertarla en la vase de datos
        firebase.db.collection('subcategoria').add(categoria);
        notify()
        router.push('/admin')
    }

    // const { listaCategorias } = UseCategoria()

    const [listaCategorias, setListaCategorias] = useState([])

    useEffect(() => {
        const getLista = async () => {
            try {
                const obtenerCategoria = () => {
                    firebase.db
                        .collection("subcategoria")
                        .orderBy('creado', "desc")
                        .onSnapshot(manejarSnapshot);
                };
                obtenerCategoria();
            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    }, [nombre]);
    function manejarSnapshot(snapshot) {
        const categorias = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setListaCategorias(categorias)
    }

    return (

        <div className='row px-5 pt-5'>
            <div className='col-md-7 blog-box px-5 pt-5'>
                <h2>Nueva SubCategoria</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit} noValidate className='text-center'>
                    <div className='mb-3 col-md-5 text-center'>
                        <label htmlFor="form3Example1cg" className='form-label'>Nombre de la sub-categoria</label>
                        <input
                            className='form-control'
                            type="text"
                            id="form3Example1cg"
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Nombre de la categoria"
                        />
                        {errores.nombre && <p>{errores.nombre}</p>}

                    </div>
                    <div className="text-center pt-4 pb-5">
                        <button type="submit" className="text btn btn-sucess">Crear Sub-Categoria</button>
                    </div>
                </form>
            </div>
            <div className="blog-box pt-5 col-md-4 m-4">
                <div className="widget">
                    <h2 className="widget-title">Lista de Sub-Categorias</h2>
                    <div className="link-widget">
                        <ul>
                            {listaCategorias?.map((category, index) => (
                                <li key={index}>
                                    <Link href="#" >{category.nombre}
                                        <span>(21)</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SubCategoria;
