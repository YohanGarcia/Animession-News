import Link from "next/link";
import { useState, useContext } from "react";
import Router, { useRouter } from "next/router";

import FileUploader from "react-firebase-file-uploader";

import Layout from "../components/layout/Layout";
import { FirebaseContext } from "../firebase";

// validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearNoticia from "../validacion/validarCrearNoticia";
import Error404 from "../components/layout/404";




const STATE_INICIAL = {
    titulo: '',
    posts1: '',
    imagen1: '',
    posts2: '',
    imagen2: ''
}

const NuevaNoticia = () => {

    // state de las imagenes
    const [nombreImagen, guardarNombre] = useState('');
    const [subiendo, guardarSubiendo] = useState(false);
    const [pregreso, guardarPregreso] = useState(0);
    const [urlimagen, guardarUrlImagen] = useState('');

    const [error, guardarErrore] = useState('');

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearNoticia, crearNoticia);
    const { titulo, posts1, imagen1, posts2, imagen2 } = valores;

    // hook de routing para redirecionar
    const router = useRouter();

    // context con las operaciones crud de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    async function crearNoticia() {

        //si el usuario no esta autenticado llevar aqui
        if (!usuario) {
            return router.push('/login')
        }

        // crear el objeto de registar noticias
        const noticia = {
            titulo,
            posts1,
            urlimagen,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            havotado: []
        }

        // insertarlo en la base de datos
        firebase.db.collection('noticias').add(noticia);
        return router.push('/')
    }

    const handleUploadStart = () => {
        guardarPregreso(0);
        guardarSubiendo(true);
    }
    const handleProgress = progreso => guardarPregreso({ progreso });

    const handleUploadError = error => {
        guardarSubiendo(error);
        console.error(error);
    }
    const handleUploadSuccess = nombre => {
        guardarPregreso(0);
        guardarSubiendo(false);
        guardarNombre(nombre)
        firebase
            .storage
            .ref('noticias')
            .child(nombre)
            .getDownloadURL()
            .then(url => {
                console.log(url),
                    guardarUrlImagen(url)
            });
    };
    return (
        <div>
            <Layout>
                {usuario?.uid === "pitLCi5WOegqkzxoHY3olbSxkOE3" && (

                    <div className="">
                        <h2 className="">Nueva Noticia</h2>
                        {error && <p className="">{error}</p>}
                        <form onSubmit={handleSubmit} noValidate>

                            <div className="">
                                <label className="" htmlFor="form3Example1cg">titulo</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="form3Example1cg"
                                    className=""
                                    value={titulo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.titulo && <p className="">{errores.titulo}</p>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido</label>
                                <textarea
                                    type="text"
                                    name="posts1"
                                    id="fexampleFormControlTextarea1"
                                    className=""
                                    value={posts1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.posts1 && <p className="">{errores.posts1}</p>}
                            </div>


                            <div className="">

                                <div className="">
                                    <label htmlFor="formFileSm" className="f">Imagen</label>
                                    <FileUploader
                                        accept="image/*"
                                        randomizeFilename
                                        storageRef={firebase.storage.ref("noticias")}
                                        onUploadStart={handleUploadStart}
                                        onUploadError={handleUploadError}
                                        onUploadSuccess={handleUploadSuccess}
                                        onProgress={handleProgress}
                                        className=""
                                        id="formFileSm"
                                        name="imagen1"
                                    />
                                </div>
                                {errores.imagen1 && <p className="r">{errores.imagen1}</p>}
                            </div>


                            <div className="">
                                <button type="submit"
                                    className="">Crear Noticia</button>
                            </div>
                        </form>
                    </div>

                )}
                {!usuario && (
                    <Error404 />
                )}

            </Layout>
        </div>
    );
}


export default NuevaNoticia;
