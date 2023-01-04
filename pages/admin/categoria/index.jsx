import React, { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import Layout from '../../../components/layout/Layout';
import { FirebaseContext } from '../../../firebase';
import { useRouter } from 'next/router';
import useValidacion from '../../../hooks/useValidacion';
import validarCrearCategoria from '../../../validacion/validarCrearCategoria';
import UseCategoria from '../../../hooks/useCategoria';
import Link from 'next/link';

const STATE_INICIAL = {
    nombre: ''
}

const Index = () => {
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
        if (!usuario) {
            return router.push('/login')
        }

        // crear el objeto de registrar la categoria
        const categoria = {
            nombre,
            creado: Date.now()
        }
        //  insertarla en la vase de datos
        firebase.db.collection('categoria').add(categoria);
        notify()
    }

    // const { listaCategorias } = UseCategoria()

    const [listaCategorias, setListaCategorias] = useState([])

    useEffect(() => {
        const getLista = async () => {
            try {
                const obtenerCategoria = () => {
                    firebase.db
                        .collection("categoria")
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
        <Layout>

            <div className='col blog-box p-3 h-25'>
                <h2>Nueva Categoria</h2>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit} noValidate>
                    <div className='mb-3 col-md-5 '>
                        <label htmlFor="form3Example1cg" className='form-label'>Nombre de la categoria</label>
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
                    <button type="submit"
                        className="btn btn-primary">Crear Noticia</button>
                </form>
            </div>
            <div className="blog-box p-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <div className="widget">
                    <h2 className="widget-title">Lista de Categorias</h2>
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

        </Layout>
    );
}

export default Index;
