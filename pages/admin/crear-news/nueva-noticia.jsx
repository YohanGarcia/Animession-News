import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Select from "react-select";
import toast from 'react-hot-toast'


import Layout from "../../../components/layout/Layout";
import { FirebaseContext } from "../../../firebase";

// validaciones
import useValidacion from "../../../hooks/useValidacion";
import validarCrearNoticia from "../../../validacion/validarCrearNoticia";
import Error404 from "../../../components/layout/404";




const STATE_INICIAL = {
    titulo: '',
    posts1: '',
    urlimagen: '',
    trailers: '',
    sinopsis: ''
}

const NuevaNoticia = () => {

    // state de las imagenes
    const [nombreImagen, guardarNombre] = useState('');
    const [subiendo, guardarSubiendo] = useState(false);
    const [pregreso, guardarPregreso] = useState(0);
    const [urlimagen, guardarUrlImagen] = useState('');
    const [categoriaSelect, setCategoriaSelect] = useState({})

    const [error, guardarErrore] = useState('');

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearNoticia, crearNoticia);
    const { titulo, posts1, posts2 = '', posts3 = '', trailers, sinopsis } = valores;

    // hook de routing para redirecionar
    const router = useRouter();

    // context con las operaciones crud de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    const notify = () => toast.success("Noticia Creada!", {
        position: 'top-right',
        duration: 3000,
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#fff',
            secondary: '#000',
        },
    });

    async function crearNoticia() {

        //si el usuario no esta autenticado llevar aqui
        if (!usuario) {
            return router.push('/login')
        }

        // crear el objeto de registar noticias
        const noticia = {
            titulo,
            posts1,
            posts2,
            posts3,
            urlimagen,
            trailers,
            sinopsis,
            votos: 0,
            creado: Date.now(),
            creador: {
                id: usuario.uid,
                nombre: usuario.displayName
            },
            havotado: [],
            categoria: {
                id: categoriaSelect.value,
                nombre: categoriaSelect.label
            }
        }

        // insertarlo en la base de datos
        firebase.db.collection('noticias').add(noticia);
        notify()
        return router.push('/admin/crear-news/nueva-noticia')
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

    //  categoria

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
    }, []);
    function manejarSnapshot(snapshot) {
        const categorias = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        setListaCategorias(categorias)
    }

    const handleSelectChange = (e) => {
        console.log(e);
        setCategoriaSelect(e)
    };
    const adminId = {
        id: 'YqzdUuBuFBflRsR1C6uVYTXvsu53',
        id: 'Vm2RAm2MUjMCeNA7Zb47883GkOM2'
    }
    return (
        <Layout>
            {usuario?.uid === 'Vm2RAm2MUjMCeNA7Zb47883GkOM2' && (

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog-box p-3">
                    <h2 className="">Nueva Noticia</h2>
                    {error && <p className="">{error}</p>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">Categoria: {categoriaSelect.label}</label>
                                <Select
                                    options={listaCategorias.map(category => ({
                                        label: category.nombre,
                                        value: category.id,
                                    }))}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">titulo</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="form3Example1cg"
                                    className="form-control"
                                    value={titulo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.titulo && <p className="">{errores.titulo}</p>}
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 1</label>
                                <textarea
                                    type="text"
                                    name="posts1"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.posts1 && <p className="">{errores.posts1}</p>}
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 2</label>
                                <textarea
                                    type="text"
                                    name="posts2"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 3</label>
                                <textarea
                                    type="text"
                                    name="posts3"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {/* <div className="col-6 pt-2">

            <label htmlFor="formFileSm" className="f">Imagen</label>
            <FileUploader
                accept="image/*"
                randomizeFilename
                storageRef={firebase.storage.ref("noticias")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
                className="form-control"
                id="formFileSm"
                name="imagen1"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
            />
            {errores.imagen1 && <p className="r">{errores.imagen1}</p>}
        </div> */}
                            <div className="col-6 pt-2">
                                <label for="basic-url" className="form-label">URL del trailer</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">https://example.com/</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="basic-url"
                                        aria-describedby="basic-addon3"
                                        name="trailers"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">Sinopsis</label>
                                <textarea
                                    type="text"
                                    id="form3Example1cg"
                                    className="form-control"
                                    name="sinopsis"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="text-center pt-2">
                            <button type="submit" className="text btn btn-sucess">Crear Noticia</button>
                        </div>
                    </form>
                </div>

            )}
            {usuario?.uid === 'YqzdUuBuFBflRsR1C6uVYTXvsu53' && (

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 blog-box p-3">
                    <h2 className="">Nueva Noticia</h2>
                    {error && <p className="">{error}</p>}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">Categoria: {categoriaSelect.label}</label>
                                <Select
                                    options={listaCategorias.map(category => ({
                                        label: category.nombre,
                                        value: category.id,
                                    }))}
                                    onChange={handleSelectChange}
                                />
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">titulo</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="form3Example1cg"
                                    className="form-control"
                                    value={titulo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.titulo && <p className="">{errores.titulo}</p>}
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 1</label>
                                <textarea
                                    type="text"
                                    name="posts1"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errores.posts1 && <p className="">{errores.posts1}</p>}
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 2</label>
                                <textarea
                                    type="text"
                                    name="posts2"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="exampleFormControlTextarea1">contenido 3</label>
                                <textarea
                                    type="text"
                                    name="posts3"
                                    id="fexampleFormControlTextarea1"
                                    className="form-control"
                                    aria-label="With textarea"
                                    value={posts3}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            {/* <div className="col-6 pt-2">

                                <label htmlFor="formFileSm" className="f">Imagen</label>
                                <FileUploader
                                    accept="image/*"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("noticias")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                    className="form-control"
                                    id="formFileSm"
                                    name="imagen1"
                                    aria-describedby="inputGroupFileAddon04"
                                    aria-label="Upload"
                                />
                                {errores.imagen1 && <p className="r">{errores.imagen1}</p>}
                            </div> */}
                            <div className="col-6 pt-2">
                                <label for="basic-url" className="form-label">URL del trailer</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon3">https://example.com/</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="basic-url"
                                        aria-describedby="basic-addon3"
                                        name="trailers"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                            </div>
                            <div className="col-6 pt-2">
                                <label className="" htmlFor="form3Example1cg">Sinopsis</label>
                                <textarea
                                    type="text"
                                    id="form3Example1cg"
                                    className="form-control"
                                    name="sinopsis"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                        </div>
                        <div className="text-center pt-2">
                            <button type="submit" className="text btn btn-sucess">Crear Noticia</button>
                        </div>
                    </form>
                </div>

            )}
            {!usuario && (
                <Error404 />
            )}

        </Layout>
    );
}


export default NuevaNoticia;
